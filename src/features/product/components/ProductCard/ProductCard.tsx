import { Star } from "lucide-react";
import styles from "./style.module.css";
import type { Product } from "../../types";
import MarqueeText from "../../../../components/MarqueeText/MarqueeText";
import type { CartStore } from "../../../cart/useCart";

type ProductCardProps = {
    product: Product;
    cart: CartStore
};

export default function ProductCard({ product, cart }: ProductCardProps) {
    const discount =
        product.discountPercent ||
        Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
        );

    const formatPrice = (value: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: product.currency || "VND",
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className={styles.image}
                />

                {discount > 0 && (
                    <div className={styles.badge}>-{discount}%</div>
                )}
            </div>

            <div className={styles.content}>
                <div>
                    <p className={styles.brand}>{product.brandName}</p>
                    <MarqueeText text={product.name} className={styles.title} speed={10} />
                </div>

                <div className={styles.rating}>
                    <Star className={styles.star} />

                    <span className={styles.ratingValue}>
                        {product.rating}
                    </span>

                    {product.reviewCount && (
                        <span className={styles.review}>
                            ({product.reviewCount} reviews)
                        </span>
                    )}
                </div>

                <div className={styles.priceGroup}>
                    <span className={styles.price}>
                        {formatPrice(product.price)}
                    </span>

                    {product.originalPrice > product.price && (
                        <span className={styles.originalPrice}>
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                <div className={styles.footer}>
                    <span
                        className={
                            product.stock && product.stock > 0
                                ? styles.inStock
                                : styles.outStock
                        }
                    >
                        {product.stock && product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                    </span>

                    <button className={styles.button} onClick={() => {
                        cart.add({
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
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}