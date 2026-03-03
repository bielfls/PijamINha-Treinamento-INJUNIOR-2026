import { createBrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Registro from "./pages/Registro";
import Feedback from "./pages/FeedBack";
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"

const router = createBrowserRouter([
    
    {
        
        path:"/",
        element:<Login />
    
    },
    {
        
        path:"/register",
        element:<Registro />
    
    },
    {
        
        path:"/feedback",
        element:<Feedback />
    
    },
    {
        path: "/header",
        element: <Header/>
    },
    {
        path: "/footer",
        element: <Footer/>
    }
    
])

export default router