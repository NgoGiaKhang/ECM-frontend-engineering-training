import React from 'react'
import type { CartStore } from '../cart/useCart'
import ProductList from '../product/components/ProductList/ProductList'

type Props = {
}

export default function HomePage({}: Props) {
  return (
    <ProductList />
  )
}
