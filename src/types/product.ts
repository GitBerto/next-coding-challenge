export type Locale = 'uk' | 'us'

export interface RawProduct {
  id: number
  name: { us: string; uk: string }
  price: { usd: number; gbp: number }
  stock: number
}

export interface Product {
  id: number
  name: string
  price: string
  stock: number
}

export interface ApiResponse {
  success: boolean
  products: RawProduct[]
}
