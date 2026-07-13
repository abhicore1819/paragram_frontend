import { Outlet, Navigate } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const ProtectRoutes = ({children}) => {
  const { login_status } = useContext(AuthContext);
  if (!login_status) {
      return <Navigate to={"/login"}></Navigate>;
}
  console.log(login_status);
  return children
};

export default ProtectRoutes;
