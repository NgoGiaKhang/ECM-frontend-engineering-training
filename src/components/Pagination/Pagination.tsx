// Pagination.tsx
import styles from "./styles.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onChange(p);
  };

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  );

  return (
    <div className={styles.pagination}>
      {/* Prev */}
      <button
        className={styles.button}
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      {/* Pages */}
      <div className={styles.pages}>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={
              p === page
                ? `${styles.page} ${styles.active}`
                : styles.page
            }
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        className={styles.button}
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}