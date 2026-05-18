import React from 'react'

import styles from "./style.module.css";
import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../product.mock';
import type { CartStore } from '../../../cart/useCart';
type Props = {
  cart: CartStore
}

export default function ProductGrid({ cart }: Props) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart}
        />
      ))}
    </div>
  );
}
