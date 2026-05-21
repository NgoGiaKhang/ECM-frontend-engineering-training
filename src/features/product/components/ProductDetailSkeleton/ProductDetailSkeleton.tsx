// ProductDetailSkeleton.tsx
import styles from "./styles.module.css";

export default function ProductDetailSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* IMAGE */}
        <div className={styles.imageBox} />

        {/* INFO */}
        <div className={styles.info}>
          <div className={styles.lineSm} />
          <div className={styles.lineMd} />
          <div className={styles.lineSm} />

          <div className={styles.priceRow}>
            <div className={styles.price} />
            <div className={styles.badge} />
          </div>

          <div className={styles.lineLg} />
          <div className={styles.lineLg} />

          <div className={styles.button} />
        </div>
      </div>
    </div>
  );
}