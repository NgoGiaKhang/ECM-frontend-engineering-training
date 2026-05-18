// CartDropdown.tsx
import {
    Minus,
    Plus,
    ShoppingCart,
    Trash2,
    X,
} from "lucide-react";

import type { CartStore } from "../../useCart";

import styles from "./styles.module.css";

type Props = {
    cart: CartStore;
    onClose: () => void;
};

export default function CartDropdown({
    cart,
    onClose,
}: Props) {
    const formatPrice = (value: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <>
            <div
                className={styles.overlay}
                onClick={onClose}
            />

            <div className={styles.dropdown}>
                <div className={styles.header}>
                    <div>
                        <h3>Shopping Cart</h3>

                        <span>
                            {cart.items.length} item
                            {cart.items.length > 1
                                ? "s"
                                : ""}
                        </span>
                    </div>

                    <button
                        className={styles.close}
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                {cart.items.length === 0 ? (
                    <div className={styles.empty}>
                        <ShoppingCart size={42} />

                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.list}>
                            {cart.items.map((item) => (
                                <div
                                    key={item.productId}
                                    className={styles.item}
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={
                                            item.productName
                                        }
                                        className={
                                            styles.image
                                        }
                                    />

                                    <div
                                        className={
                                            styles.info
                                        }
                                    >
                                        <h4>
                                            {
                                                item.productName
                                            }
                                        </h4>

                                        <p>
                                            {formatPrice(
                                                item.price
                                            )}
                                        </p>

                                        <div
                                            className={
                                                styles.actions
                                            }
                                        >
                                            <button
                                                onClick={() =>
                                                    cart.decrease(
                                                        item.productId
                                                    )
                                                }
                                            >
                                                <Minus
                                                    size={14}
                                                />
                                            </button>

                                            <span>
                                                {
                                                    item.quantity
                                                }
                                            </span>

                                            <button
                                                onClick={() =>
                                                    cart.increase(
                                                        item.productId
                                                    )
                                                }
                                            >
                                                <Plus
                                                    size={14}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className={
                                            styles.remove
                                        }
                                        onClick={() =>
                                            cart.remove(
                                                item.productId
                                            )
                                        }
                                    >
                                        <Trash2
                                            size={16}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div
                            className={
                                styles.footer
                            }
                        >
                            <div
                                className={
                                    styles.total
                                }
                            >
                                <span>Total</span>

                                <strong>
                                    {formatPrice(
                                        cart.totalPrice
                                    )}
                                </strong>
                            </div>

                            <button
                                className={
                                    styles.checkout
                                }
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}