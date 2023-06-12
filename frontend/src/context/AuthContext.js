import { createContext, useContext, useState } from "react";
import { login } from "../api/AuthenticationApiService";
import { api } from "../api/ApiClient";

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
        return true;
      })
      .catch(() => {
        setIsAuthenticated(false);
        return false;
      });
  };

  const logoutHandler = () => {
    setUserId(false);
    setIsAuthenticated(false);
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, token, role, loginHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
