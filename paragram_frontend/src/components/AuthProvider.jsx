import { LineChart, SettingsIcon, TowelRackIcon } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("Authorization");
  const [logged_in, setLoggedIn] = useState(!!token);
  // const [bottom_navbar, setBottomNavbar] = useState(false);
  // useEffect(() => {
  //   if (token) {
  //     console.log("initial login status:-", logged_in)
  //     setLoggedIn(true);
  //     setBottomNavbar(true);
  //   } else {
  //     setLoggedIn(false);
  //     setBottomNavbar(false);
  //   }
  // }, []);
  return (
    <AuthContext.Provider
      value={{ login_status: logged_in}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
