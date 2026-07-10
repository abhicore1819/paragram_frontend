import { useNavigate } from 'react-router-dom';
import { ArrowRight, HelpCircle, LockIcon, LogOut, SettingsIcon, Users } from 'lucide-react';

export default function Profile({ confessionCount, totalReactions }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black pt-6 px-4 md:px-6 xl:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6 pb-6">
          {/* Header */}
          <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10">
            <div className="text-center md:text-left mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">Profile</p>
              <h1 className="text-3xl md:text-4xl font-black text-gray-100">
                Your Journey
              </h1>
              <p className="text-gray-400 text-sm md:text-base mt-2">
                Your confession statistics and settings
              </p>
            </div>
          </div>

          {/* User Card and Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* User Card */}
            <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-gray-400 to-gray-300 text-2xl font-bold text-black shadow-lg shadow-gray-400/30">
                  A
                </div>
                <p className="text-lg font-semibold text-gray-100 mb-1">Anonymous User</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Joined Paragram</p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10">
              <div className="mb-3 text-xs uppercase tracking-[0.24em] text-gray-400">
                Statistics
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gray-900/50 border border-gray-700/50 p-4 text-center">
                  <p className="text-2xl md:text-3xl font-black text-gray-100">
                    {confessionCount}
                  </p>
                  <p className="text-gray-400 text-[10px] md:text-[11px] uppercase tracking-[0.2em] mt-2">
                    Confessions
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-900/50 border border-gray-700/50 p-4 text-center">
                  <p className="text-2xl md:text-3xl font-black text-gray-100">
                    {totalReactions}
                  </p>
                  <p className="text-gray-400 text-[10px] md:text-[11px] uppercase tracking-[0.2em] mt-2">
                    Reactions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-100 mb-3 uppercase tracking-wider">
              Settings
            </h2>
            <div className="space-y-2">
              {[
                { label: 'Invite Friends', icon: <Users/> },
                { label: 'Preferences', icon: <SettingsIcon/> },
                { label: 'Privacy & Security', icon: <LockIcon/> },
                { label: 'About & Help', icon: <HelpCircle/> }
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between rounded-2xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 text-left text-gray-300 hover:bg-gray-900/70 hover:border-gray-600 transition-all duration-200 text-sm md:text-base"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-[#ffffff] border rounded-lg  border-gray-700 hover:bg-[#0f0f0f] px-4 py-3 text-gray-700 hover:text-gray-100 font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

          {/* Footer Info */}
          <div className="text-center mb-5 space-y-3">
            <div className="rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">App Info</p>
              <p className="text-sm font-semibold text-gray-300">Tenebris v1.0</p>
              <p className="text-xs text-gray-500 mt-1">Made with care in the quiet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
