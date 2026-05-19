import Link from 'next/link'
import styles from '@/app/page.module.css'

type Props = {
  href: string
}

export function BasketButton({ href }: Props) {

  return (
    <Link href={href} className={styles.basket} aria-label={`View basket`} title="View basket">
      Basket
    </Link>
  )
}
