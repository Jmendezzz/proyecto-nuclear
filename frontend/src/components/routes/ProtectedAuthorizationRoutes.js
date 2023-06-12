import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ErrorResponse } from "../../UI/error/ErrorResponse";


export const ProtectedAuthorizationRoutes = ({roleProvided})=>{
    const {role} = useAuth();

    return role == roleProvided ? <Outlet/> : <Navigate to={"/unauthorized"}/>

}