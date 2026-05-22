import { getAddress, type Address, type Log } from 'viem'
import { getPrisma } from '@/lib/platform/db'
import { campaignAbi, campaignFactoryAbi } from '@/lib/platform/generated'
import { getPlatformFactoryAddress } from '@/lib/platform/config'
import { publicClient } from '@/lib/platform/onchain-api'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as const
type DecodedLog = Log & {
  eventName?: string
  args?: Record<string, unknown>
}

const STATUS_LABELS = [
  'CREATED',
  'APPROVED',
  'REJECTED',
  'LIVE',
  'ENDED',
  'FINALIZED',
] as const

function mapStatus(status: number, finalized: boolean, successful: boolean) {
  if (status === 5 || finalized) {
    return successful ? 'FINALIZED_SUCCESS' : 'FINALIZED_FAIL'
  }

  return STATUS_LABELS[status] ?? 'CREATED'
}

function factoryDeployBlock() {
  const value = Number(process.env.FACTORY_DEPLOY_BLOCK ?? '0')
  return Number.isFinite(value) && value >= 0 ? BigInt(Math.floor(value)) : 0n
}

function chunkSize() {
  const value = Number(process.env.INDEXER_BLOCK_CHUNK ?? '50000')
  return BigInt(Number.isFinite(value) && value > 0 ? Math.floor(value) : 50000)
}

async function getContractEventsChunked(args: {
  address: Address
  abi: typeof campaignAbi | typeof campaignFactoryAbi
  eventName?: string
  fromBlock: bigint
  toBlock: bigint
}) {
  const events: Log[] = []
  const size = chunkSize()
  let fromBlock = args.fromBlock

  while (fromBlock <= args.toBlock) {
    const toBlock = fromBlock + size - 1n > args.toBlock
      ? args.toBlock
      : fromBlock + size - 1n

    const logs = await publicClient.getContractEvents({
      address: args.address,
      abi: args.abi,
      eventName: args.eventName,
      fromBlock,
      toBlock,
    } as Parameters<typeof publicClient.getContractEvents>[0])
    events.push(...(logs as Log[]))
    fromBlock = toBlock + 1n
  }

  return events
}

async function readCampaignState(
  campaignId: number,
  campaignAddress: Address,
  companyFromEvent?: Address,
) {
  const address = getAddress(campaignAddress)
  const [
    name,
    symbol,
    metadataURI,
    minRaise,
    maxRaise,
    tokenPrice,
    startTime,
    endTime,
    acceptedAsset,
    status,
    totalCommitted,
    finalized,
    successful,
    token,
    company,
  ] = await Promise.all([
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'name' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'symbol' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'metadataURI' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'minRaise' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'maxRaise' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'tokenPrice' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'startTime' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'endTime' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'acceptedAsset' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'getStatus' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'totalCommitted' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'finalized' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'successful' }),
    publicClient.readContract({ address, abi: campaignAbi, functionName: 'token' }),
    publicClient
      .readContract({ address, abi: campaignAbi, functionName: 'company' })
      .catch(() => companyFromEvent ?? ZERO_ADDRESS),
  ] as const)

  return {
    onChainId: campaignId,
    contractAddress: address,
    company: getAddress(company as Address),
    name: name as string,
    symbol: symbol as string,
    metadataURI: (metadataURI as string) || null,
    minRaise: (minRaise as bigint).toString(),
    maxRaise: (maxRaise as bigint).toString(),
    tokenPrice: (tokenPrice as bigint).toString(),
    startTime: new Date(Number(startTime as bigint) * 1000),
    endTime: new Date(Number(endTime as bigint) * 1000),
    acceptedAsset: getAddress(acceptedAsset as Address),
    status: mapStatus(Number(status), finalized as boolean, successful as boolean),
    totalCommitted: (totalCommitted as bigint).toString(),
    finalized: finalized as boolean,
    successful: finalized ? (successful as boolean) : null,
    tokenAddress:
      String(token).toLowerCase() === ZERO_ADDRESS
        ? null
        : getAddress(token as Address),
  }
}

async function upsertCampaignFromCreatedLog(log: DecodedLog) {
  const campaignId = Number(log.args?.campaignId ?? 0)
  const campaignAddress = getAddress(String(log.args?.campaignAddress ?? ZERO_ADDRESS))
  const company = getAddress(String(log.args?.company ?? ZERO_ADDRESS))
  const data = await readCampaignState(campaignId, campaignAddress, company)
  const prisma = getPrisma()

  await prisma.campaign.upsert({
    where: { onChainId: campaignId },
    update: data,
    create: data,
  })

  return data.contractAddress as Address
}

async function applyCampaignLog(campaignAddress: Address, log: DecodedLog) {
  const prisma = getPrisma()
  const address = getAddress(campaignAddress)

  switch (log.eventName) {
    case 'CampaignApproved':
      await prisma.campaign.updateMany({
        where: { contractAddress: address },
        data: { status: 'APPROVED' },
      })
      break

    case 'CampaignRejected':
      await prisma.campaign.updateMany({
        where: { contractAddress: address },
        data: { status: 'REJECTED' },
      })
      break

    case 'FundsCommitted': {
      const investor = getAddress(String(log.args?.investor ?? ZERO_ADDRESS)).toLowerCase()
      const amount = String(log.args?.amount ?? '0')
      const campaign = await prisma.campaign.findUnique({
        where: { contractAddress: address },
        select: { id: true },
      })
      if (!campaign || !log.transactionHash) break

      const totalCommitted = await publicClient.readContract({
        address,
        abi: campaignAbi,
        functionName: 'totalCommitted',
      })

      await prisma.$transaction([
        prisma.commitment.upsert({
          where: { txHash: log.transactionHash },
          update: {
            investor,
            amount,
            blockNumber: Number(log.blockNumber ?? 0n),
            campaignId: campaign.id,
          },
          create: {
            campaignId: campaign.id,
            investor,
            amount,
            blockNumber: Number(log.blockNumber ?? 0n),
            txHash: log.transactionHash,
          },
        }),
        prisma.campaign.update({
          where: { id: campaign.id },
          data: { totalCommitted: totalCommitted.toString() },
        }),
      ])
      break
    }

    case 'CampaignFinalized': {
      const successful = Boolean(log.args?.successful)
      const totalRaised = String(log.args?.totalRaised ?? '0')
      const token = successful
        ? await publicClient.readContract({
            address,
            abi: campaignAbi,
            functionName: 'token',
          })
        : ZERO_ADDRESS

      await prisma.campaign.updateMany({
        where: { contractAddress: address },
        data: {
          finalized: true,
          successful,
          status: successful ? 'FINALIZED_SUCCESS' : 'FINALIZED_FAIL',
          totalCommitted: totalRaised,
          tokenAddress:
            String(token).toLowerCase() === ZERO_ADDRESS
              ? null
              : getAddress(token as Address),
        },
      })
      break
    }

    case 'TokensClaimed':
      await prisma.commitment.updateMany({
        where: {
          campaign: { contractAddress: address },
          investor: getAddress(String(log.args?.investor ?? ZERO_ADDRESS)).toLowerCase(),
        },
        data: { claimed: true },
      })
      break

    case 'RefundClaimed':
      await prisma.commitment.updateMany({
        where: {
          campaign: { contractAddress: address },
          investor: getAddress(String(log.args?.investor ?? ZERO_ADDRESS)).toLowerCase(),
        },
        data: { refunded: true },
      })
      break
  }
}

export async function syncOnChainEvents() {
  const prisma = getPrisma()
  const factoryAddress = getPlatformFactoryAddress()
  const deployBlock = factoryDeployBlock()
  const state = await prisma.indexerState.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      lastSyncedBlock: Number(deployBlock > 0n ? deployBlock - 1n : 0n),
    },
  })

  const currentBlock = await publicClient.getBlockNumber()
  const fromBlock =
    BigInt(state.lastSyncedBlock) < deployBlock
      ? deployBlock
      : BigInt(state.lastSyncedBlock) + 1n

  if (fromBlock > currentBlock) {
    return {
      fromBlock: fromBlock.toString(),
      toBlock: currentBlock.toString(),
      campaignCreated: 0,
      campaignEvents: 0,
      skipped: true,
    }
  }

  const createdLogs = await getContractEventsChunked({
    address: factoryAddress,
    abi: campaignFactoryAbi,
    eventName: 'CampaignCreated',
    fromBlock,
    toBlock: currentBlock,
  })

  const campaignAddresses = new Set<string>()
  for (const log of createdLogs) {
    const address = await upsertCampaignFromCreatedLog(log as DecodedLog)
    campaignAddresses.add(address)
  }

  const knownCampaigns = await prisma.campaign.findMany({
    select: { contractAddress: true },
  })
  for (const campaign of knownCampaigns) {
    campaignAddresses.add(getAddress(campaign.contractAddress as Address))
  }

  let campaignEvents = 0
  for (const campaignAddress of campaignAddresses) {
    const logs = await getContractEventsChunked({
      address: campaignAddress as Address,
      abi: campaignAbi,
      fromBlock,
      toBlock: currentBlock,
    })
    campaignEvents += logs.length
    for (const log of logs as DecodedLog[]) {
      await applyCampaignLog(campaignAddress as Address, log)
    }
  }

  await prisma.indexerState.update({
    where: { id: 1 },
    data: { lastSyncedBlock: Number(currentBlock) },
  })

  return {
    fromBlock: fromBlock.toString(),
    toBlock: currentBlock.toString(),
    campaignCreated: createdLogs.length,
    campaignEvents,
    skipped: false,
  }
}
