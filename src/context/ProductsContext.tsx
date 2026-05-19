'use client';
import { createContext, useContext, useState } from 'react'
import type { RawProduct } from '@/types/product'

type ProductCache = { products: RawProduct[]; cachedAt: number }

type ProductsContextType = {
  moreProductsCache: ProductCache | null
  setMoreProductsCache: (products: RawProduct[]) => void
}

const ProductsContext = createContext<ProductsContextType | null>(null)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [moreProductsCache, setMoreProductsCacheRaw] = useState<ProductCache | null>(null)

  const setMoreProductsCache = (products: RawProduct[]) =>
    setMoreProductsCacheRaw({ products, cachedAt: Date.now() })

  return (
    <ProductsContext.Provider value={{ moreProductsCache, setMoreProductsCache }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts must be used within ProductsProvider')
  return context
}
