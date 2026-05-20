'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { BasketButton } from './BasketButton'
import styles from '@/app/page.module.css'

function getLocalePrefix(pathname: string): string | null {
  const segment = pathname.split('/')[1]
  return /^[a-z]{2}$/.test(segment) ? segment : null
}

export function Header() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const locale = getLocalePrefix(pathname)
  const isCheckout = pathname.endsWith('/checkout')
  const checkoutHref = locale ? `/${locale}/checkout` : '/checkout'
  const homeHref = locale ? `/${locale}` : '/'

  return (
    <header className={styles.description}>
      <h1><Link href={homeHref}>Michael&apos;s Amazing Web Store</Link></h1>
      <div>
        <BasketButton count={totalItems} href={checkoutHref} disabled={isCheckout} />
      </div>
    </header>
  )
}
