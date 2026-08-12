import { AlertTriangle } from "lucide-react";
import LogoutUser from "../service/LogoutUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { isRouteErrorResponse, renderMatches } from "react-router-dom";
import SnackbarMessage from "./snackbar/SnackBarMessage";
import { useNavigate } from "react-router-dom";
export default function LogoutConfirmation({ onCancel }) {
  // ----- hooks -----
  const navigate = useNavigate();
  // ----- hooks -----

  // ----- context data -----
  const { logged_in, setLoggedIn, token, setToken } = useContext(AuthContext);
  // ----- context data -----

  // ----- states -----
  const [render, setRender] = useState(true);
  const [display_message, setDisplayMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);
  const [disable, setDisabled] = useState(false);
  // ----- states -----

  // ===== logs-out user =====
  const Logout = async () => {
    const response = await LogoutUser(token);
    if (response) {
      setDisabled(true);
      setOpen(true);
      setDisplayMessage("user logged out");
      setSeverity("success");
      setTimeout(() => {
        setLoggedIn(false);
        navigate("/login");
      }, 3000);
    } else {
      setOpen(true);
      setDisplayMessage(
        "something went wrong while logging out. try again later",
      );
      setSeverity("warning");
    }
  };
  // ===== logs-out user =====

  return (
    <div>
      {render ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-900/20 border border-red-800">
              <AlertTriangle className="h-7 w-7 text-red-400" />
            </div>
            <SnackbarMessage
              severity={severity}
              openstatus={open}
              variant={"filled"}
              display_message={display_message}
            />
            <h2 className="text-center text-2xl font-black text-gray-100">
              Log Out?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-gray-400">
              Are you sure you want to log out?
              <br />
              You'll need to login again to access your account.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-gray-700 bg-[#0f0f0f] py-3 font-semibold text-gray-300 transition-all hover:bg-gray-900"
              >
                Cancel
              </button>

              {disable ? (
                <button
                  onClick={Logout}
                  disabled={disable}
                  className="flex-1 flex rounded-xl justify-center bg-gray-100 hover:scale-95 disabled:bg-gray-700 disabled:text-gray-500 text-gray-950 py-3 font-semibold text-black transition-all hover:scale-[0.97]"
                >
                  <p className=" h-6 w-6 rounded-full animate-spin border-4 text-gray-200 border-t-transparent"></p>
                </button>
              ) : (
                <button
                  onClick={Logout}
                  disabled={disable}
                  className="flex-1 rounded-xl bg-white py-3 font-semibold text-black transition-all hover:scale-[0.97]"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
