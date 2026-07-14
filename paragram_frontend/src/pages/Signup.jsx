import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

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

          {/* {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
              {error}
            </div>
          )} */}

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                username
              </label>
              <input
                type="text"
                // value={}
                // onChange={(e) => setusername(e.target.value)}
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
                  type={"password"}
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm pr-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={"password"}
                  // value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all text-sm pr-10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 text-gray-950 font-bold py-3 rounded-lg transition-all duration-200 text-sm uppercase tracking-wider"
            >
              {/* {isLoading ? "Creating Account..." : "Create Account"} */}
              Create Account
            </button>
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
