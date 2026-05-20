import type { ApiResponse, RawProduct } from '@/types/product'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchProducts(): Promise<RawProduct[]> {
  const res = await fetch(`${API_BASE}/products`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch products')
  const data: ApiResponse = await res.json()
  return data.products
}

export async function fetchMoreProducts(): Promise<RawProduct[]> {
  const res = await fetch(`${API_BASE}/more-products`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch more products')
  const data: ApiResponse = await res.json()
  return data.products
}
