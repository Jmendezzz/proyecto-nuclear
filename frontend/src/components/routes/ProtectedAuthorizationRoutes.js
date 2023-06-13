import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";


export const ProtectedAuthorizationRoutes = ({rolesProvided})=>{
    const {role} = useAuth();


    return rolesProvided.includes(role) ? <Outlet/> : <Navigate to={"/unauthorized"}/>

}