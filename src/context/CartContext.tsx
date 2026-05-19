'use client';
import { createContext, useContext, useState } from 'react'
import { formatPrice } from '@/lib/currency'
import type { Product } from '@/types/product'

export type CartItem = { product: Product; quantity: number }

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  totalItems: number
  totalPrice: string
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPriceAmount = cart.reduce((sum, item) => sum + item.product.priceAmount * item.quantity, 0)
  const currency = cart[0]?.product.currency ?? 'GBP'
  const totalPrice = totalPriceAmount > 0 ? formatPrice(totalPriceAmount, currency) : ''

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
