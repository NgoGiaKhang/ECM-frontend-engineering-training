import type { CartStore } from "../features/cart/useCart"
import ProductList from "../features/product/components/ProductList/ProductList"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"

type AppLayoutProps = {
    cart: CartStore
}

export default function AppLayout({ cart }: AppLayoutProps) {

    return (
        <>
            <Header cart={cart} />
            <main>
                <ProductList cart={cart} />
            </main>
            <Footer />
        </>
    )
}
