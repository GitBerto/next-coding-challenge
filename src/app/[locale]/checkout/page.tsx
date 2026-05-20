'use client';
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/currency'
import { pluralise } from '@/lib/pluralise'
import styles from './checkout.module.css'

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice } = useCart()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Basket</h1>
      <p className={styles.summary}>{totalItems} {pluralise(totalItems, 'item')}</p>

      {cart.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ product, quantity }) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{quantity}</td>
                <td>{formatPrice(product.priceAmount * quantity, product.currency)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}><strong>Total items</strong></td>
              <td><strong>{totalItems}</strong></td>
            </tr>
            <tr>
              <td colSpan={3}><strong>Total price</strong></td>
              <td><strong>{totalPrice}</strong></td>
            </tr>
          </tfoot>
        </table>
      )}

      <Link href="/" aria-label="Continue shopping" title="Continue shopping" className={styles.back}>
        &lt; Continue shopping
      </Link>
    </div>
  )
}
