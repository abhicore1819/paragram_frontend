import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import "./App.css";

export default function App() {
  return (
    <div className=" no-select min-h-screen bg-black text-white">
      <div className="pb-24 md:pb-28">
        <Outlet />
        <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-700 pb-20">
          <div className="text-center py-4 text-xs uppercase tracking-[0.24em] text-gray-500">
            Founder: <span className="text-gray-300">Abhinav Chaudhary</span>
          </div>
      <BottomNav />
        </div>
      </div>
    </div>
  );
}
