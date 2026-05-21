import { Outlet } from "react-router-dom"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"

export default function AppLayout() {
    return (
        <>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
