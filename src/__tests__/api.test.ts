import { fetchProducts, fetchMoreProducts } from '@/lib/api'

const API_BASE = process.env.API_BASE_URL
import { mockProducts, mockMoreProducts } from './__fixtures__/products'

function mockFetchSuccess(products = mockProducts) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, products }),
  } as Response)
}

function mockFetchFailure() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
  } as Response)
}

afterEach(() => {
  jest.resetAllMocks()
})

describe('fetchProducts', () => {
  it('returns products on success', async () => {
    mockFetchSuccess()
    const products = await fetchProducts()
    expect(products).toEqual(mockProducts)
  })

  it('calls the correct endpoint', async () => {
    mockFetchSuccess()
    await fetchProducts()
    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE}/products`,
      expect.any(Object)
    )
  })

  it('throws on failed response', async () => {
    mockFetchFailure()
    await expect(fetchProducts()).rejects.toThrow('Failed to fetch products')
  })
})

describe('fetchMoreProducts', () => {
  it('returns products on success', async () => {
    mockFetchSuccess(mockMoreProducts)
    const products = await fetchMoreProducts()
    expect(products).toEqual(mockMoreProducts)
  })

  it('calls the correct endpoint', async () => {
    mockFetchSuccess(mockMoreProducts)
    await fetchMoreProducts()
    expect(fetch).toHaveBeenCalledWith(
      '/api/more-products',
      expect.any(Object)
    )
  })

  it('throws on failed response', async () => {
    mockFetchFailure()
    await expect(fetchMoreProducts()).rejects.toThrow('Failed to fetch more products')
  })
})
