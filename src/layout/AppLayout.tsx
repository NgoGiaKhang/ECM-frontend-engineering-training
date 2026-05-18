import type { CartStore } from "../features/cart/useCart"
import ProductGrid from "../features/product/components/ProductList/ProductGrid"
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
                <ProductGrid cart={cart} />
            </main>
            <Footer />
        </>
    )
}
