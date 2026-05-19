import Link from 'next/link'
import styles from '@/app/page.module.css'
import { pluralise } from '@/lib/pluralise'

type Props = {
  count: number
  href: string
  disabled?: boolean
}

export function BasketButton({ count, href, disabled }: Props) {
  const label = `Basket: ${count} ${pluralise(count, 'item')}`

  if (disabled) {
    return <span className={styles.basket}>{label}</span>
  }

  return (
    <Link href={href} className={styles.basket} aria-label={`View basket, ${label}`} title="View basket">
      {label}
    </Link>
  )
}
