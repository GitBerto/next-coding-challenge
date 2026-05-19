type Props = {
  name: string
  count: number
}

export function ItemCount({ name, count }: Props) {
  return <div>{name} count: {count}</div>
}
