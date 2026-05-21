
import styles from "./style.module.css";
import ProductCard from '../ProductCard/ProductCard';
import type { CartStore } from '../../../cart/useCart';
import ProductCardSkeleton from '../ProductCardSkeleton/ProductCardSkeleton';
import { useFetch } from '../../../../api/useFetch';
import type { Product } from '../../types';
import { api } from '../../../../api/api';
import type { PaginatedResponse } from "../../../../api/types";
import { useState } from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import { productService } from "../../product.service";
import ProductListEmpty from "../ProductListEmpty/ProductListEmpty";
type Props = {
  cart: CartStore
}

const skeletonItem = 8;
export default function ProductList() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)

  const { loading, data } = useFetch((signal) => productService.findAll(page, limit, signal), [page, limit]);

  if (data && data.pagination.total == 0) {
    return <ProductListEmpty />;
  }


  if (!data && !loading) return <div>Error</div>

  return (
    <div>
      <div className={styles.grid}>

        {loading ? (<>{Array.from({ length: skeletonItem, }).map((_, index) => (
          <ProductCardSkeleton
            key={index}
          />
        ))}</>)
          : (<>{data?.data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}</>)}

      </div>
      <div className={styles.paginationContainer}>
        <Pagination onChange={(p) => {
          setPage(p)
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }} page={page} totalPages={data?.pagination.totalPages ?? 4} />
      </div>
    </div>
  );
}
