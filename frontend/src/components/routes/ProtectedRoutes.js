import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";


export const ProtectedRoutes = ()=>{

    const {isAuthenticated} = useAuth();

    return isAuthenticated ? <Outlet/> :  <Navigate to="/login"/>
};
