import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'crypto'
import { promisify } from 'util'
import type { CompanyAccount } from '@prisma/client'

const scrypt = promisify(scryptCallback)
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000

export interface CompanyTokenPayload {
  sub: number
  companyId: string
  walletAddress: string
  exp: number
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  return `scrypt:${salt}:${derivedKey.toString('hex')}`
}

export async function verifyPassword(password: string, passwordHash: string) {
  const parts = passwordHash.split(':')
  const [scheme, salt, key] =
    parts.length === 3 ? parts : ['legacy-scrypt', parts[0], parts[1]]

  if (!salt || !key) return false
  if (scheme !== 'scrypt' && scheme !== 'legacy-scrypt') return false

  const storedKey = Buffer.from(key, 'hex')
  const derivedKey = (await scrypt(password, salt, storedKey.length)) as Buffer
  return (
    storedKey.length === derivedKey.length &&
    timingSafeEqual(storedKey, derivedKey)
  )
}

function authSecret() {
  if (process.env.COMPANY_AUTH_SECRET) return process.env.COMPANY_AUTH_SECRET
  if (process.env.NEXTAUTH_SECRET) return process.env.NEXTAUTH_SECRET
  if (process.env.NODE_ENV !== 'production') return 'ip-foundation-local-company-secret'
  throw new Error('COMPANY_AUTH_SECRET is not configured')
}

function sign(value: string) {
  return createHmac('sha256', authSecret()).update(value).digest('base64url')
}

export function createCompanyToken(account: Pick<CompanyAccount, 'id' | 'companyId' | 'walletAddress'>) {
  const payload: CompanyTokenPayload = {
    sub: account.id,
    companyId: account.companyId,
    walletAddress: account.walletAddress,
    exp: Date.now() + TOKEN_TTL_MS,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${sign(body)}`
}

export function verifyCompanyToken(token: string | null | undefined) {
  if (!token) return null

  const [body, signature] = token.split('.')
  if (!body || !signature) return null

  const expected = sign(body)
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)
  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8'),
    ) as CompanyTokenPayload
    return payload.exp > Date.now() ? payload : null
  } catch {
    return null
  }
}

export function requireCompanyToken(request: Request) {
  const authorization = request.headers.get('authorization')
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null
  return verifyCompanyToken(token)
}

export function isAdminRequest(request: Request) {
  const provided = request.headers.get('x-admin-password') ?? ''
  return verifyAdminPassword(provided)
}

export function verifyAdminPassword(provided: string) {
  const expected =
    process.env.ADMIN_PASSWORD ??
    (process.env.NODE_ENV !== 'production' ? 'admin123' : '')
  if (!expected || !provided) return false

  const expectedBuffer = Buffer.from(expected)
  const providedBuffer = Buffer.from(provided)
  return (
    expectedBuffer.length === providedBuffer.length &&
    timingSafeEqual(expectedBuffer, providedBuffer)
  )
}

export function isIndexerRequest(request: Request) {
  const secret = process.env.INDEXER_SYNC_SECRET ?? process.env.CRON_SECRET
  if (secret) {
    const bearer = request.headers.get('authorization')
    return bearer === `Bearer ${secret}`
  }

  return isAdminRequest(request)
}

export function toPublicCompany(
  account: Pick<CompanyAccount, 'id' | 'companyId' | 'name' | 'walletAddress' | 'createdAt'>,
) {
  return {
    id: account.id,
    companyId: account.companyId,
    name: account.name,
    walletAddress: account.walletAddress,
    createdAt: account.createdAt,
  }
}

export function normalizeWallet(value: string) {
  return value.trim().toLowerCase()
}
