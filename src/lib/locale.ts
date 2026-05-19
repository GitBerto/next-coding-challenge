import { formatPrice } from './currency'
import type { Locale, RawProduct, Product } from '@/types/product'

interface LocaleConfig {
  nameKey: 'uk' | 'us'
  priceKey: 'gbp' | 'usd'
  currency: string
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  uk: { nameKey: 'uk', priceKey: 'gbp', currency: 'GBP' },
  us: { nameKey: 'us', priceKey: 'usd', currency: 'USD' },
}

export function resolveProduct(raw: RawProduct, locale: Locale): Product {
  const config = localeConfig[locale]
  return {
    id: raw.id,
    name: raw.name[config.nameKey],
    price: formatPrice(raw.price[config.priceKey], config.currency),
    stock: raw.stock,
  }
}
