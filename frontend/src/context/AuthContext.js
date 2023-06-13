import { createContext, useContext, useState } from "react";
import { login } from "../api/AuthenticationApiService";
import { api } from "../api/ApiClient";
import { useNavigate } from "react-router-dom";
import { roles } from "../enums/Roles";
import Swal from "sweetalert2";


const errorResponseAlert = (error) => {
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      confirmButtonColor: 'red',
      confirmButtonText: 'Aceptar',
  })
}
export const AuthContext = createContext({
  isAuthenticated: false,
  userId: null,
  token: null,
  role: null,
  loginHandler: () => {},
  logoutHandler: ()=>{}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userId, setUserId] = useState(null);

  const [token, setToken] = useState(null);

  const [role, setRole] = useState(null);

  const loginHandler = (username, password) => {
    login(username, password)
      .then((res) => {
        setToken(res.data.token);
        setIsAuthenticated(true);
        setRole(res.data.role);
        setUserId(res.data.user_id);
        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${res.data.token}`; // Add the token to all the requests.
          return config;
        });
        navigate(  res.data.role == roles.ADMIN ?  "/dashboard" : "/horario");

        return true;
      })
      .catch(() => {
        errorResponseAlert("Credenciales inválidas");
        setIsAuthenticated(false);
        return false;
      });
  };

  const logoutHandler = () => {
    setUserId(false);
    setIsAuthenticated(false);
    setToken(null);
    setRole(null);
    navigate("/login");
    window.location.reload();
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, token, role, loginHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
