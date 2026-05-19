import styles from '@/app/page.module.css'
import type { Product } from '@/types/product'

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <button
      className={styles.card}
      onClick={() => onAddToCart(product)}
      aria-label={`Add ${product.name} to basket`}
      title={`Add ${product.name} to basket`}
    >
      <span className={styles.cardTitle}>{product.name} - </span>
      <p>{product.price}</p>
    </button>
  )
}
