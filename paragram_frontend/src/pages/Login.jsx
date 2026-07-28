import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import FormHanlder from "../forms/FormHandler";
import LoginUser from "../service/LoginUser";
import { AuthContext } from "../components/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
export default function Login() {
  //  ===== states =====
  const [login_form, setLoginForm] = useState({ username: "", password: "" });
  const [ui_message, setUIMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [is_loading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  //  ===== states =====

  // ===== context =====
  const { logged_in, setLoggedIn, token, setToken, username, setUsername } =
    useContext(AuthContext);
  // ===== context ======

  //  ===== hooks =====
  const navigate = useNavigate();
  //  ===== hooks =====

  //  ===== handles the login response =====
  const HandleLoginResponse = async () => {
    const login_cookie = await LoginUser({
      username: login_form.username,
      password: login_form.password,
    });
    if (login_cookie) {
      setTimeout(() => {
        setToken(login_cookie);
        setLoggedIn(true)
        navigate("/");
      }, 2000);
    }
  };
  //  ===== handles the login response =====

  // ===== input handler =====
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  // ===== input handler =====

  // ===== handle login =====
  const HandleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDisabled(true);
    setError(false);
    const response = await FormHanlder(login_form);
    switch (response) {
      case "password must be 6 characters long":
        console.log("Error state:-", error);
        setIsLoading(false);
        setError(true);
        setUIMessage(response);
        setDisabled(false);
        break;

      case "password must contain atleast one upper case and lower case letter":
        console.log("Error state:-", error);
        setIsLoading(false);
        setError(true);
        setUIMessage(response);
        setDisabled(false);
        break;

      case "allowed":
        setIsLoading(true);
        setDisabled(true);
        HandleLoginResponse()
        break;

      default:
        break;
    }
  };
  // ===== handle login =====

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <ToastContainer autoClose={3000} position="top-center" />
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-100 mb-2">Paragram</h1>
          <p className="text-gray-400 text-sm">Welcome back to the paragram</p>
        </div>

        <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-8 shadow-xl shadow-gray-900/20">
          <h2 className="text-xl font-bold text-gray-100 mb-6">Login</h2>

          {error && (
            <div className="mb-4 p-3  text-center rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
              {ui_message}
            </div>
          )}

          <form onSubmit={HandleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                value={login_form.username}
                onChange={HandleChange}
                placeholder="username"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={login_form.password}
                  onChange={HandleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {is_loading ? (
              <div className=" flex justify-center items-center bg-gray-700 w-full mt-6 py-3 rounded-lg transition-all duration-200 text-sm ">
                <p className="border-4 border-gray-300 rounded-full border-t-transparent w-6 h-6 animate-spin">
                  {" "}
                </p>
              </div>
            ) : (
              <button
                disabled={disabled}
                type="submit"
                className="w-full mt-6 bg-gray-100 hover:scale-95 disabled:bg-gray-700 disabled:text-gray-500 text-gray-950 font-bold py-3 rounded-lg transition-all duration-200 text-sm uppercase tracking-wider"
              >
                Login
              </button>
            )}
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-gray-100 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
