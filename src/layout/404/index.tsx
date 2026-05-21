import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import { Home, AlertTriangle } from "lucide-react";
import Button from "../../components/Button/Button";



export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <AlertTriangle size={48} />
        </div>

        <h1 className={styles.title}>
          404
        </h1>

        <p className={styles.text}>
          Oops! Page not found
        </p>

        <p className={styles.subText}>
          The page you’re looking for doesn’t
          exist or has been moved.
        </p>

        <Button to="/" as={Link}>
          <Home size={18} />
          Back to Home
        </Button>
      </div>
    </div>
  );
}