import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import SignupFormHanlder from "../service/SignUpFormHandler";
export default function Signup() {
  const [disbale, setDisabled] = useState(false);
  const [show_password, setShowPassword] = useState(false);
  const [err, setErr] = useState(false);
  const [login, setLogin] = useState(false);
  const [ui_msg, setUIMsg] = useState("");
  const navigate = useNavigate();

  const PasswordToggle = () => {
    if (!show_password) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    dob: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const Submit = (e) => {
    setLogin(true);
    setDisabled(true);

    e.preventDefault();
    const response = SignupFormHanlder(form);

    switch (response) {
      case "age restricted":
        setDisabled(false);
        setErr(true);
        setUIMsg("user must be 18 or above 18");
        break;

      case "password must contain atleast one upper case and lower case letter":
        setDisabled(false);
        setErr(true);
        setUIMsg(response);
        break;

      case "password must be 6 characters long":
        setDisabled(false);
        setLogin(false);
        setErr(true);
        setUIMsg(response);
        break;

      case "password mismatch":
        setDisabled(false);
        setLogin(false);
        setErr(true);
        setUIMsg(response);
        break;

      case "password matched":
        setLogin(false);
        setDisabled(false);
        setErr(true);
        setUIMsg(response);
        break;

      case "allowed":
        setLogin(true);
        setDisabled(true);
        setErr(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-100 mb-2">Paragram</h1>
          <p className="text-gray-400 text-sm">
            Join the conversational community
          </p>
        </div>

        <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-5 shadow-xl shadow-gray-900/20">
          <h2 className="text-xl font-bold text-gray-100 mb-6">
            Create Account
          </h2>

          {err && (
            <div className="mb-4 p-3 text-center rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
              {ui_msg}
            </div>
          )}

          <form onSubmit={Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                required
                name="email"
                onChange={HandleChange}
                type="email"
                value={form["email"]}
                placeholder="you@example.com"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                username
              </label>
              <input
                name="username"
                required
                onChange={HandleChange}
                type="text"
                value={form["username"]}
                placeholder="username"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  onChange={HandleChange}
                  required
                  value={form["password"]}
                  type={show_password ? "password" : "text"}
                  placeholder="••••••••"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm pr-10"
                />
                <button
                  onClick={() => setShowPassword(!show_password)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {show_password ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  onChange={HandleChange}
                  required
                  name="confirm_password"
                  type={show_password ? "password" : "text"}
                  value={form["confirm_password"]}
                  placeholder="••••••••"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm pr-10"
                />
                <button
                  onClick={() => setShowPassword(!show_password)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {show_password ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                DOB
              </label>
              <div className="relative">
                <input
                  name="dob"
                  onChange={HandleChange}
                  required
                  type={"date"}
                  value={form["dob"]}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm pr-10"
                />
              </div>
            </div>

            {login ? (
              <div className=" flex justify-center items-center bg-gray-700 w-full mt-6 py-3 rounded-lg transition-all duration-200 text-sm ">
                <p className="border-4 border-gray-300 rounded-full border-t-transparent w-6 h-6 animate-spin">
                  {" "}
                </p>
              </div>
            ) : (
              <button
                disabled={disbale}
                type="submit"
                className="w-full mt-6 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 text-gray-950 font-bold py-3 rounded-lg transition-all duration-200 text-sm uppercase tracking-wider"
              >
                Create Account
              </button>
            )}
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-100 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
