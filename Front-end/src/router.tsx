import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from './pages/Login';
import Registro from "./pages/Registro";
import Feedback from "./pages/FeedBack";
import { Catalog } from "./pages/Catalog";
import PijamaPage from "./pages/PijamaPage/pijamaPage";

const router = createBrowserRouter([
    
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {path: "login", element: <Login/>},
            {path: "registro", element: <Registro/>},
            {path: "feedback", element: <Feedback/>},
            {index: true, element: <Catalog/>},
            {path: "/pijamaPage", element: <PijamaPage/>}


        ]
    }
    
])

export default router