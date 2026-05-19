import styles from '@/app/page.module.css'
import type { Product } from '@/types/product'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <button
      className={styles.card}
      aria-label={`Add ${product.name} to basket`}
      title={`Add ${product.name} to basket`}
    >
      <span className={styles.cardTitle}>{product.name} <span>-&gt;</span></span>
      <p>{product.price}</p>
    </button>
  )
}
