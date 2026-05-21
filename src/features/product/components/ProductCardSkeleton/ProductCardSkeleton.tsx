import styles from "./styles.module.css";

export default function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />

      <div className={styles.content}>
        <div className={styles.brand} />

        <div className={styles.title} />

        <div className={styles.titleSmall} />

        <div className={styles.priceRow}>
          <div className={styles.price} />
          <div className={styles.oldPrice} />
        </div>

        <div className={styles.button} />
      </div>
    </div>
  );
}