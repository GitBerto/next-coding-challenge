export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).format(amount)
}
