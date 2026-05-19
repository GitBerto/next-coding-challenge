import type { RawProduct } from '@/types/product'

export const mockProducts: RawProduct[] = [
  { id: 1, name: { us: 'Wireless Headphones', uk: 'Wireless Headsets' }, price: { usd: 99.99, gbp: 76.99 }, stock: 45 },
  { id: 2, name: { us: 'Smart Watch', uk: 'Fitness Tracker' }, price: { usd: 199.99, gbp: 154.99 }, stock: 28 },
  { id: 3, name: { us: 'Laptop Backpack', uk: 'Computer Rucksack' }, price: { usd: 49.99, gbp: 38.50 }, stock: 120 },
  { id: 4, name: { us: 'Bluetooth Speaker', uk: 'Wireless Speaker' }, price: { usd: 79.99, gbp: 61.50 }, stock: 32 },
  { id: 5, name: { us: 'Mechanical Keyboard', uk: 'Gaming Keyboard' }, price: { usd: 129.99, gbp: 99.99 }, stock: 15 },
]

export const mockMoreProducts: RawProduct[] = [
  { id: 5, name: { us: 'Mechanical Keyboard', uk: 'Gaming Keyboard' }, price: { usd: 129.99, gbp: 99.99 }, stock: 15 },
  { id: 1, name: { us: 'Wireless Headphones', uk: 'Wireless Headsets' }, price: { usd: 99.99, gbp: 76.99 }, stock: 45 },
  { id: 2, name: { us: 'Smart Watch', uk: 'Fitness Tracker' }, price: { usd: 199.99, gbp: 154.99 }, stock: 28 },
]
