#!/usr/bin/env node
import { existsSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const candidateSourcePaths = [
  process.env.IPPLATFORM_SQLITE_PATH,
  'D:\\code\\ipplatform\\packages\\api\\prisma\\dev.db',
  path.resolve(process.cwd(), '..', 'ipplatform', 'packages', 'api', 'prisma', 'dev.db'),
].filter(Boolean)

const sourcePath = candidateSourcePaths.find((candidate) =>
  existsSync(candidate),
)

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL must point to the production Postgres database.')
  process.exit(1)
}

if (!sourcePath) {
  console.error(
    'Could not find the local ipplatform SQLite database. Set IPPLATFORM_SQLITE_PATH.',
  )
  process.exit(1)
}

const pythonCode = String.raw`
import json
import sqlite3
import sys

db_path = sys.argv[1]
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row

def rows(table):
    return [dict(row) for row in conn.execute(f'SELECT * FROM "{table}"')]

print(json.dumps({
    "Campaign": rows("Campaign"),
    "Commitment": rows("Commitment"),
    "Post": rows("Post"),
    "Follow": rows("Follow"),
    "CompanyAccount": rows("CompanyAccount"),
    "IndexerState": rows("IndexerState"),
}))
`

const python = process.env.PYTHON ?? 'python'
const result = spawnSync(python, ['-c', pythonCode, sourcePath], {
  encoding: 'utf8',
  maxBuffer: 1024 * 1024 * 32,
})

if (result.status !== 0) {
  console.error(result.stderr || result.stdout)
  process.exit(result.status ?? 1)
}

const data = JSON.parse(result.stdout)

function asDate(value) {
  if (value === null || value === undefined) return undefined
  if (typeof value === 'number') return new Date(value)
  if (/^\d+$/.test(String(value))) return new Date(Number(value))
  return new Date(value)
}

function normalizeWallet(value) {
  return String(value ?? '').trim().toLowerCase()
}

async function resetSequence(table) {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE(MAX("id"), 1), MAX("id") IS NOT NULL) FROM "${table}"`,
  )
}

async function main() {
  for (const campaign of data.Campaign) {
    await prisma.campaign.upsert({
      where: { onChainId: campaign.onChainId },
      update: {
        contractAddress: campaign.contractAddress,
        company: campaign.company,
        name: campaign.name,
        symbol: campaign.symbol,
        metadataURI: campaign.metadataURI,
        description: campaign.description,
        imageUrl: campaign.imageUrl,
        minRaise: campaign.minRaise,
        maxRaise: campaign.maxRaise,
        tokenPrice: campaign.tokenPrice,
        startTime: asDate(campaign.startTime),
        endTime: asDate(campaign.endTime),
        acceptedAsset: campaign.acceptedAsset,
        status: campaign.status,
        totalCommitted: campaign.totalCommitted,
        finalized: Boolean(campaign.finalized),
        successful:
          campaign.successful === null || campaign.successful === undefined
            ? null
            : Boolean(campaign.successful),
        tokenAddress: campaign.tokenAddress,
        createdAt: asDate(campaign.createdAt),
        updatedAt: asDate(campaign.updatedAt),
      },
      create: {
        id: campaign.id,
        onChainId: campaign.onChainId,
        contractAddress: campaign.contractAddress,
        company: campaign.company,
        name: campaign.name,
        symbol: campaign.symbol,
        metadataURI: campaign.metadataURI,
        description: campaign.description,
        imageUrl: campaign.imageUrl,
        minRaise: campaign.minRaise,
        maxRaise: campaign.maxRaise,
        tokenPrice: campaign.tokenPrice,
        startTime: asDate(campaign.startTime),
        endTime: asDate(campaign.endTime),
        acceptedAsset: campaign.acceptedAsset,
        status: campaign.status,
        totalCommitted: campaign.totalCommitted,
        finalized: Boolean(campaign.finalized),
        successful:
          campaign.successful === null || campaign.successful === undefined
            ? null
            : Boolean(campaign.successful),
        tokenAddress: campaign.tokenAddress,
        createdAt: asDate(campaign.createdAt),
        updatedAt: asDate(campaign.updatedAt),
      },
    })
  }

  for (const account of data.CompanyAccount) {
    await prisma.companyAccount.upsert({
      where: { companyId: account.companyId },
      update: {
        name: account.name,
        passwordHash: account.passwordHash,
        walletAddress: normalizeWallet(account.walletAddress),
        createdAt: asDate(account.createdAt),
        updatedAt: asDate(account.updatedAt),
      },
      create: {
        id: account.id,
        companyId: account.companyId,
        name: account.name,
        passwordHash: account.passwordHash,
        walletAddress: normalizeWallet(account.walletAddress),
        createdAt: asDate(account.createdAt),
        updatedAt: asDate(account.updatedAt),
      },
    })
  }

  for (const commitment of data.Commitment) {
    await prisma.commitment.upsert({
      where: { txHash: commitment.txHash },
      update: {
        campaignId: commitment.campaignId,
        investor: normalizeWallet(commitment.investor),
        amount: commitment.amount,
        blockNumber: commitment.blockNumber,
        claimed: Boolean(commitment.claimed),
        refunded: Boolean(commitment.refunded),
        createdAt: asDate(commitment.createdAt),
      },
      create: {
        id: commitment.id,
        campaignId: commitment.campaignId,
        investor: normalizeWallet(commitment.investor),
        amount: commitment.amount,
        blockNumber: commitment.blockNumber,
        txHash: commitment.txHash,
        claimed: Boolean(commitment.claimed),
        refunded: Boolean(commitment.refunded),
        createdAt: asDate(commitment.createdAt),
      },
    })
  }

  for (const post of data.Post) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: {
        campaignId: post.campaignId,
        company: normalizeWallet(post.company),
        content: post.content,
        createdAt: asDate(post.createdAt),
      },
      create: {
        id: post.id,
        campaignId: post.campaignId,
        company: normalizeWallet(post.company),
        content: post.content,
        createdAt: asDate(post.createdAt),
      },
    })
  }

  for (const follow of data.Follow) {
    const follower = normalizeWallet(follow.follower)
    const company = normalizeWallet(follow.company)
    await prisma.follow.upsert({
      where: { follower_company: { follower, company } },
      update: {
        createdAt: asDate(follow.createdAt),
      },
      create: {
        id: follow.id,
        follower,
        company,
        createdAt: asDate(follow.createdAt),
      },
    })
  }

  for (const state of data.IndexerState) {
    await prisma.indexerState.upsert({
      where: { id: state.id },
      update: { lastSyncedBlock: state.lastSyncedBlock },
      create: { id: state.id, lastSyncedBlock: state.lastSyncedBlock },
    })
  }

  for (const table of ['Campaign', 'Commitment', 'Post', 'Follow', 'CompanyAccount']) {
    await resetSequence(table)
  }

  console.log(
    JSON.stringify(
      {
        imported: {
          campaigns: data.Campaign.length,
          commitments: data.Commitment.length,
          posts: data.Post.length,
          follows: data.Follow.length,
          companyAccounts: data.CompanyAccount.length,
          indexerStates: data.IndexerState.length,
        },
      },
      null,
      2,
    ),
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
