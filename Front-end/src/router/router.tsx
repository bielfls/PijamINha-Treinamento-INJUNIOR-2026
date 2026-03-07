import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Login from '../pages/Login';
import Registro from "../pages/Registro";
import Feedback from "../pages/FeedBack";
import { Catalog } from "../pages/Catalog";
import PijamaPage from "../pages/PijamaPage/pijamaPage";
import DiscountProductCard from "../components/DiscountProductCard/discountProductCard";
import Home from "../pages/Home";
import RouterProtection from "./routerProtection";
import CartPage from "../pages/CartPage";
import Favorites from "../pages/favorites";

const router = createBrowserRouter([
    {path: "/DiscountProductCard", element: <DiscountProductCard/>},
    
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {path: "login", element: <Login/>},
            {path: "register", element: <Registro/>},
            {path: "feedback", element: <Feedback/>},
            {path: "product/:id", element: <PijamaPage />},
            {path: "catalogo", element: <Catalog/>},
            {path: "cartPage", element: <RouterProtection allowedRoles={["Logged"]}><CartPage/></RouterProtection>},
            {path: "favoritos", element: <Favorites/>},
            {index: true, element: <Home/>},

        ]
    }
    
])

export default router