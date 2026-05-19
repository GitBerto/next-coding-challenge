/**
 * @jest-environment node
 */
import { middleware } from '@/middleware'
import { NextRequest } from 'next/server'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost'

function createRequest(path: string): NextRequest {
  return new NextRequest(`${BASE_URL}${path}`)
}

describe('default uk path', () => {
  it('/ serves the homepage', () => {
    const res = middleware(createRequest('/'))
    expect(res.status).not.toBe(307)
    expect(res.headers.get('x-middleware-rewrite')).toContain('/uk/')
  })

  it('/something returns 404', () => {
    const res = middleware(createRequest('/something'))
    expect(res.status).not.toBe(307)
    expect(res.headers.get('x-middleware-rewrite')).toContain('/uk/something')
  })

  it('/uk redirects to /', () => {
    const res = middleware(createRequest('/uk'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe(`${BASE_URL}/`)
  })

  it('/uk/something redirects to /something', () => {
    const res = middleware(createRequest('/uk/something'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe(`${BASE_URL}/something`)
  })
})

describe('us path', () => {
  it('/us serves without redirect', () => {
    const res = middleware(createRequest('/us'))
    expect(res.headers.get('location')).toBeNull()
    expect(res.headers.get('x-middleware-rewrite')).toBeNull()
  })

  it('/us/something returns 404', () => {
    const res = middleware(createRequest('/us/something'))
    expect(res.headers.get('location')).toBeNull()
    expect(res.headers.get('x-middleware-rewrite')).toBeNull()
  })
})
