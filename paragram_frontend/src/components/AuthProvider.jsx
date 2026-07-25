import { LineChart, SettingsIcon, TowelRackIcon } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const token = document.cookie
  const [logged_in, setLoggedIn] = useState(token);

  return (
    <AuthContext.Provider value={{ logged_in, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
