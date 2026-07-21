import { LineChart, SettingsIcon, TowelRackIcon } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("Authorization");
  const [logged_in, setLoggedIn] = useState(!!token);

  return (
    <AuthContext.Provider
      value={{ login_status: logged_in}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
