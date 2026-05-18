// Header.tsx
import {
  Search,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";

import styles from "./styles.module.css";
import type { CartStore } from "../../features/cart/useCart";
import { useState } from "react";
import CartDropdown from "../../features/cart/components/CartDropdown/CartDropdown";

type Props = {
  cart: CartStore
}

export default function Header({ cart }: Props) {
  const [openCart, setOpenCart] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton}>
          <Menu size={22} />
        </button>

        <h1 className={styles.logo}>
          <span>Ja</span>Shop
        </h1>
      </div>

      <div className={styles.search}>
        <Search
          size={18}
          className={styles.searchIcon}
        />

        <input
          type="text"
          placeholder="Search products..."
          className={styles.input}
        />
      </div>

      <div className={styles.actions}>
        <div style={{
          position: "relative"
        }}>
          <button className={styles.iconButton} onClick={() =>
            setOpenCart(!openCart)
          }>
            <ShoppingCart size={22} />
            <span className={styles.badge}>{cart.totalItems}</span>

          </button>
          {openCart && (
            <CartDropdown onClose={() => setOpenCart(false)} cart={cart} />
          )}
        </div>
        <button className={styles.iconButton}>
          <User size={22} />
        </button>
      </div>
    </header>
  );
}