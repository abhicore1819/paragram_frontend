import { NavLink } from 'react-router-dom';
import { Home, BookOpen, PlusCircle, Bell, User, Key } from 'lucide-react';
import SnackbarMessage from "../components/snackbar/SnackBarMessage";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function BottomNav() {
  //  ----- hooks -----
  const navigate = useNavigate()
  //  ----- hooks -----
  // ----- states -----
    const [open, setOpen] = useState(false);
  // ----- states -----


   // ===== sets the pop-message state =====
  const Notify = () => {
    setOpen(true);
    setSatateMessage("info");
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  // ===== sets the pop-message state =====

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, to: '/' },
    // { id: 'confessions', label: 'Confessions', icon: BookOpen, to: '/post' },
    { id: 'new', label: 'New', icon: PlusCircle, to: '/new' },
    // { id: 'activity', label: 'Activity', icon: Bell, to: '/activity' },
    { id: 'profile', label: 'Profile', icon: User, to: '/profile' },
  ];


  

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f0f] border-t border-gray-700 backdrop-blur-xl">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${
                isActive ? 'text-gray-100 scale-110' : 'text-gray-500 hover:text-gray-200'
              }`
            }
            title={item.label}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[10px] mt-1 font-medium uppercase tracking-wide">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
