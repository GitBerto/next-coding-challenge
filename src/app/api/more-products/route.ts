import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types/product'

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/more-products`, { cache: 'no-store' })
  if (!res.ok) return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status })
  const data: ApiResponse = await res.json()
  return NextResponse.json(data)
}
