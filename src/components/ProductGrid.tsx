'use client';
import { useState, useEffect } from 'react'
import styles from '@/app/page.module.css'
import { ProductCard } from './ProductCard'
import { resolveProduct } from '@/lib/locale'
import type { Product, Locale, ApiResponse } from '@/types/product'

type Props = {
  products: Product[]
  locale: Locale
}

export function ProductGrid({ products }: Props) {

  return (
    <div>
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  )
}
