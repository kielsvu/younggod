import { NextRequest, NextResponse } from 'next/server'

const WINDOW_MS = 60_000
const MAX_REQUESTS = 120
const clients = new Map<string, { count: number; resetAt: number }>()

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIp || null
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = clients.get(key)

  if (!current || current.resetAt <= now) {
    clients.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > MAX_REQUESTS
}

function pruneClients(now: number) {
  if (clients.size < 5000) return
  for (const [key, value] of clients) {
    if (value.resetAt <= now) clients.delete(key)
  }
}

export default function middleware(request: NextRequest) {
  const key = getClientKey(request)
  const now = Date.now()

  pruneClients(now)

  if (key && isRateLimited(key)) {
    return new NextResponse('Too many requests. Please try again later.', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Cache-Control': 'no-store',
      },
    })
  }

  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return new NextResponse('Method not allowed.', {
      status: 405,
      headers: {
        Allow: 'GET, HEAD, OPTIONS',
        'Cache-Control': 'no-store',
      },
    })
  }

  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS))
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico).*)'],
}
