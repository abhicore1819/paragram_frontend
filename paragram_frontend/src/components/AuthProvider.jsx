import { LineChart, SettingsIcon, TowelRackIcon } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const spliited_token = document.cookie.split("=");
  const [token_key, token_val] = spliited_token;
  const [token, setToken] = useState(token_val);
  const [logged_in, setLoggedIn] = useState(false);
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, logged_in, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
