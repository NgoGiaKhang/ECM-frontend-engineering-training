// Header.tsx
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  LogIn,
  LogOut,
} from "lucide-react";

import styles from "./styles.module.css";
import type { CartStore } from "../../features/cart/useCart";
import { useState } from "react";
import CartDropdown from "../../features/cart/components/CartDropdown/CartDropdown";
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from "../../features/cart/cart.store";
import { useAuthStore } from "../../features/auth/auth.store";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import IconButton from "../../components/IconButton/IconButton";

type Props = {
  cart: CartStore
}

export default function Header() {
  const [openCart, setOpenCart] = useState(false);

  const { pathname } = useLocation()
  const isAvive = (name: string) => {
    return pathname === name
  }

  const totalItem = useCartStore((s) => s.totalItems())
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <header className={styles.header}>
      <Container className={styles.headerInner}>
        <div className={styles.left}>
          <h1 className={styles.logo}>
            <span>Ja</span>Shop
          </h1>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${isAvive("/") ? styles.active : ""}`}>
              <Link to={"/"}>Home</Link>
            </li>
            <li className={`${styles.navItem} ${isAvive("/products") ? styles.active : ""}`}>
              <Link to={"/products"}>Products</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <div style={{
            position: "relative"
          }}>

            <IconButton className={styles.iconButton} onClick={() =>
              setOpenCart(!openCart)
            }>
              <ShoppingCart size={22} />
              <span className={styles.badge}>{totalItem}</span>

            </IconButton>
            {openCart && (
              <CartDropdown onClose={() => setOpenCart(false)} />
            )}

          </div>
          {
            user ? (
              <>
                <span>
                  {user.name}
                </span>
                <IconButton onClick={() => logout()}>
                  <LogOut size={22} />
                </IconButton>

              </>
            ) : (
              <IconButton to="/login" as={Link}>
                <LogIn size={22} />
              </IconButton>
            )
          }

        </div>
      </Container>
    </header>
  );
}