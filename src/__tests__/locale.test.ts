import { resolveProduct, localeConfig } from '@/lib/locale'
import type { RawProduct } from '@/types/product'

const mockRawProduct: RawProduct = {
  id: 1,
  name: { us: 'Wireless Headphones', uk: 'Wireless Headsets' },
  price: { usd: 99.99, gbp: 76.99 },
  stock: 45,
}

describe('localeConfig', () => {
  it('has uk and us entries', () => {
    expect(localeConfig.uk).toBeDefined()
    expect(localeConfig.us).toBeDefined()
  })

  it('maps uk to GBP', () => {
    expect(localeConfig.uk.currency).toBe('GBP')
    expect(localeConfig.uk.priceKey).toBe('gbp')
    expect(localeConfig.uk.nameKey).toBe('uk')
  })

  it('maps us to USD', () => {
    expect(localeConfig.us.currency).toBe('USD')
    expect(localeConfig.us.priceKey).toBe('usd')
    expect(localeConfig.us.nameKey).toBe('us')
  })
})

describe('resolveProduct', () => {
  it('resolves uk product with GBP price and uk name', () => {
    const product = resolveProduct(mockRawProduct, 'uk')
    expect(product.id).toBe(1)
    expect(product.name).toBe('Wireless Headsets')
    expect(product.price).toBe('£76.99')
    expect(product.stock).toBe(45)
  })

  it('resolves us product with USD price and us name', () => {
    const product = resolveProduct(mockRawProduct, 'us')
    expect(product.name).toBe('Wireless Headphones')
    expect(product.price).toBe('$99.99')
  })

  it('returned product has no raw locale fields', () => {
    const product = resolveProduct(mockRawProduct, 'uk')
    expect(product).not.toHaveProperty('name.uk')
    expect(product).not.toHaveProperty('price.gbp')
  })
})
