import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import { useContext, createContext, useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { AuthContext } from "./components/AuthProvider";
import ProtectRoutes from "./components/ProtectedRoutes";
import AuthProvider from "./components/AuthProvider";
// const AppContent = () => {
// const { navbar_status } = useContext(AuthContext);
//   return (
//     <div>
//       {navbar_status && (

//       )}
//     </div>
//   );
// };
export default function App() {
  const { login_status } = useContext(AuthContext);
  return (
    // <AuthProvider>
    <div className=" no-select min-h-screen bg-black text-white">
      <div className="pb-28 md:pb-28">
        <Outlet />
        {login_status && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-700 pb-20">
            <div className="text-center py-4 text-xs uppercase tracking-[0.24em] text-gray-500">
              Founder: <span className="text-gray-300">Abhinav Chaudhary</span>
              <BottomNav />
            </div>
          </div>
        )}
      </div>
    </div>
    // </AuthProvider>
  );
}
