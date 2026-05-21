// ProductListEmpty.tsx
import styles from "./styles.module.css";
import { PackageX } from "lucide-react";

export default function ProductListEmpty() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <PackageX size={48} />

        <h2>No products found</h2>

        <p>
          Try adjusting your filters or
          search criteria.
        </p>
      </div>
    </div>
  );
}