'use client';
import { usePathname } from 'next/navigation'
import { BasketButton } from './BasketButton'
import styles from '@/app/page.module.css'

function getCheckoutHref(pathname: string): string {
  const locale = pathname.split('/')[1]
  return locale && locale !== 'checkout' ? `/${locale}/checkout` : '/checkout'
}

export function Header() {
  const pathname = usePathname()
  const checkoutHref = getCheckoutHref(pathname)

  return (
    <header className={styles.description}>
      <p>Michael&apos;s Amazing Web Store</p>
      <div>
        <BasketButton href={checkoutHref}  />
      </div>
    </header>
  )
}
