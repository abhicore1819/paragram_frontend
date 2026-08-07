import { Outlet, Navigate } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const ProtectRoutes = ({ children }) => {
  const { logged_in, setLoggedIn, token, setToken } = useContext(AuthContext);
  
  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default ProtectRoutes;
