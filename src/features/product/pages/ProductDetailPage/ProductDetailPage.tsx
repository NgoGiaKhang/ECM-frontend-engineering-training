import { data, Navigate, useParams } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

import styles from "./style.module.css";
import { products } from '../../product.mock';
import type { CartStore } from "../../../cart/useCart";
import ScrollToTop from "../../../../components/ScrollToTop";
import { useFetch } from "../../../../api/useFetch";
import { productService } from "../../product.service";
import ProductDetailSkeleton from "../../components/ProductDetailSkeleton/ProductDetailSkeleton";
import { useCartStore } from "../../../cart/cart.store";
import Button from "../../../../components/Button/Button";
import Container from "../../../../components/Container/Container";

type Props = {
}

export default function ProductDetailPage({ }: Props) {
  const { id } = useParams();
  const { loading, data: product } = useFetch((signal) => productService.findById(id, signal), [])
  const addCart = useCartStore(s => s.add)
  if (loading) return <ProductDetailSkeleton />


  const formatPrice = (v: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(v);

  if (!product) return <></>


  const discountPrice =
    product.price &&
    product.originalPrice > product.price;

  return (
    <Container size="lg" as='section' padding="lg">
      <ScrollToTop />
      <div className={styles.grid}>
        {/* IMAGE */}
        <div className={styles.gallery}>
          <img
            src={product.thumbnail}
            className={styles.mainImage}
          />

          <div className={styles.thumbRow}>
            {product.images?.map((img) => (
              <img
                key={img}
                src={img}
                className={styles.thumb}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className={styles.info}>
          <p className={styles.brand}>
            {product.brandName}
          </p>

          <h1 className={styles.title}>
            {product.name}
          </h1>

          <div className={styles.meta}>
            <span className={styles.rating}>
              <Star
                size={14}
                fill="#f59e0b"
              />{" "}
              {product.rating}
            </span>

            <span>
              ({product.reviewCount} reviews)
            </span>

            <span>
              Sold {product.sold}
            </span>
          </div>

          {/* PRICE */}
          <div className={styles.priceBox}>
            <span className={styles.price}>
              {formatPrice(product.price)}
            </span>

            {discountPrice && (
              <span
                className={
                  styles.originalPrice
                }
              >
                {formatPrice(
                  product.originalPrice
                )}
              </span>
            )}

            {product.discountPercent && (
              <span className={styles.badge}>
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {/* STOCK */}
          <p className={styles.stock}>
            {product.stock} items available
          </p>

          {/* TAGS */}
          <div className={styles.tags}>
            {product.tags?.map((t) => (
              <span key={t}>
                #{t}
              </span>
            ))}
          </div>

          {/* DESC */}
          <p className={styles.desc}>
            {product.description}
          </p>

          {/* CTA */}
          <Button  onClick={() => {
            addCart({
              productId: product.id,
              productName: product.name,
              productSlug: product.slug || "",
              brandName: product.brandName,
              thumbnail: product.thumbnail,
              quantity: 1,
              rating: product.rating,
              originalPrice: product.originalPrice,
              price: product.price,
              discountPercent: product.discountPercent,
              currency: product.currency,
            });
          }}>
            <ShoppingCart size={18} />
            Add to cart
          </Button>
        </div>
      </div>
    </Container>
  );
}