import { Outlet } from "react-router-dom"
import Header from "../components/Header/header"
import Footer from "../components/Footer/footer"

export default function RootLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet /> 
            </main>
            <Footer />
        </>
    )
}