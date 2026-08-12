import { AlertTriangle } from "lucide-react";
import LogoutUser from "../service/LogoutUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { isRouteErrorResponse, renderMatches } from "react-router-dom";
export default function LogoutConfirmation({ onCancel }) {
  const { is_clicked, setClicked } = useContext(AuthContext);
  const [render, setRender] = useState(true);

  useEffect(() => {
    console.log("executing on every reload");
  }, []);
  return (
    <div>
      {render ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-900/20 border border-red-800">
              <AlertTriangle className="h-7 w-7 text-red-400" />
            </div>

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

              <button
                // onClick={Logout}
                className="flex-1 rounded-xl bg-white py-3 font-semibold text-black transition-all hover:scale-[0.97]"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
