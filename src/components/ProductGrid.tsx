'use client';
import { useState, useEffect } from 'react'
import styles from '@/app/page.module.css'
import { ProductCard } from './ProductCard'
import { fetchMoreProducts } from '@/lib/api'
import { resolveProduct } from '@/lib/locale'
import { useCart } from '@/context/CartContext'
import { useProducts } from '@/context/ProductsContext'
import type { Product, Locale } from '@/types/product'

type Props = {
  products: Product[]
  locale: Locale
}

export function ProductGrid({ products, locale }: Props) {
  const [allProducts, setAllProducts] = useState<Product[]>(products)
  const { addToCart } = useCart()
  const { moreProductsCache, setMoreProductsCache } = useProducts()

  const CACHE_TTL_MS = Number(process.env.NEXT_PUBLIC_CACHE_TTL_MS) || 300000
  const isCacheValid = moreProductsCache && (Date.now() - moreProductsCache.cachedAt) < CACHE_TTL_MS
  const [loadingMore, setLoadingMore] = useState(!isCacheValid)

  useEffect(() => {
    if (isCacheValid) {
      const resolved = moreProductsCache.products.map(p => resolveProduct(p, locale))
      setAllProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id))
        const newProducts = resolved.filter(p => !existingIds.has(p.id))
        return newProducts.length > 0 ? [...prev, ...newProducts] : prev
      })
      return
    }

    async function load() {
      try {
        const rawProducts = await fetchMoreProducts()
        setMoreProductsCache(rawProducts)
        const resolved = rawProducts.map(p => resolveProduct(p, locale))
        setAllProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id))
          const newProducts = resolved.filter(p => !existingIds.has(p.id))
          return newProducts.length > 0 ? [...prev, ...newProducts] : prev
        })
      } catch {
        // more-products failing should not affect the main product list
      } finally {
        setLoadingMore(false)
      }
    }
    load()
  }, [locale]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={styles.grid}>
        {allProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
      {loadingMore && (
        <p aria-live="polite" aria-busy="true">Looking for more products...</p>
      )}
    </>
  )
}
