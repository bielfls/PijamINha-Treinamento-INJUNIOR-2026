import type {ReactNode} from "react"
import {Navigate} from "react-router"

interface ProtectRouterProps{
    children: ReactNode,
    allowedRoles: Array<"NotLogged" | "Logged">
}

export default function RouterProtection({children, allowedRoles}: ProtectRouterProps){
    
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const userRoles = localStorage.getItem("userRole") as "NotLogged" | "Logged" | null

    if(!isAuthenticated){
        return <Navigate to="/"/>
    }

    if(userRoles && !allowedRoles.includes(userRoles)){
        return <Navigate to="/"/>
    }

    return(
        <>{children}</>
    )
}