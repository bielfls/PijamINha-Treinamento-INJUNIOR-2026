import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from './pages/Login';
import Registro from "./pages/Registro";
import Feedback from "./pages/FeedBack";
import { Catalog } from "./pages/Catalog";
import PijamaPage from "./pages/PijamaPage/pijamaPage";
import DiscountProductCard from "./components/DiscountProductCard/discountProductCard";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {path: "/DiscountProductCard", element: <DiscountProductCard/>},
    
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {path: "login", element: <Login/>},
            {path: "register", element: <Registro/>},
            {path: "feedback", element: <Feedback/>},
            {path: "pijamapage", element: <PijamaPage/>},
            {path: "catalogo", element: <Catalog/>},
            {index: true, element: <Home/>},
            


        ]
    }
    
])

export default router