import { createBrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Registro from "./pages/Registro";
import Feedback from "./pages/FeedBack";

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

   
    
])

export default router