import { formatPrice } from '@/lib/currency'

describe('formatPrice', () => {
  it('formats GBP correctly', () => {
    expect(formatPrice(76.99, 'GBP')).toBe('£76.99')
  })

  it('formats USD correctly', () => {
    expect(formatPrice(99.99, 'USD')).toBe('$99.99')
  })

  it('formats zero', () => {
    expect(formatPrice(0, 'GBP')).toBe('£0.00')
  })

  it('formats amounts with many decimal places by rounding to 2', () => {
    expect(formatPrice(10.999, 'USD')).toBe('$11.00')
  })
})
