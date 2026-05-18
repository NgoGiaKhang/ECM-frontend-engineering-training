

import styles from "./style.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <h2 className={styles.logo}>
                        <span>Ja</span>Shop
                    </h2>

                    <p className={styles.description}>
                        Modern ecommerce experience with
                        premium products and fast delivery.
                    </p>
                </div>

                <div className={styles.links}>
                    <div>
                        <h3>Shop</h3>

                        <a href="#">New Arrivals</a>
                        <a href="#">Trending</a>
                        <a href="#">Best Sellers</a>
                        <a href="#">Sale</a>
                    </div>

                    <div>
                        <h3>Support</h3>

                        <a href="#">Help Center</a>
                        <a href="#">Shipping</a>
                        <a href="#">Returns</a>
                        <a href="#">Contact</a>
                    </div>

                    <div>
                        <h3>Company</h3>

                        <a href="#">About</a>
                        <a href="#">Careers</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>
                    © 2026 Ja Shop. All rights reserved.
                </p>

                <div className={styles.socials}>
                    {/* <a href="#">
                        <Facebook size={18} />
                    </a> */}

                </div>
            </div>
        </footer>
    );
}