import { fetchProducts } from '@/lib/api'
import { resolveProduct } from '@/lib/locale'
import { ProductGrid } from '@/components/ProductGrid'
import type { Locale } from '@/types/product'

export default async function StorePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const rawProducts = await fetchProducts()
  const products = rawProducts.map(p => resolveProduct(p, locale))

  return <ProductGrid products={products} locale={locale} />
}
