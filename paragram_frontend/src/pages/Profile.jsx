import {
  renderMatches,
  UNSAFE_DataRouterStateContext,
  useNavigate,
} from "react-router-dom";
import {
  UserRound,
  ArrowRight,
  HelpCircle,
  LockIcon,
  LogOut,
  LucideFolderOutput,
  Pen,
  SettingsIcon,
  Users,
} from "lucide-react";
import { FetchProfile, EditProfile } from "../service/FetchProfile";
import { useContext, useEffect } from "react";
import { FormatJoinDate } from "../calculations/FormatTime";
import { AuthContext } from "../components/AuthProvider";
import LogoutUser from "../service/LogoutUser";
import LogoutConfirmation from "../components/LogoutConfirmation";
import { toast, ToastContainer } from "react-toastify";
import SnackbarMessage from "../components/snackbar/SnackBarMessage";
import { useState } from "react";
export default function Profile() {
  // ----- context data -----
  const { logged_in, setLoggedIn, token, setToken, is_clicked, setClicked } =
    useContext(AuthContext);
  // ----- context data -----

  // ----- hooks ------
  const navigate = useNavigate();
  // ----- hooks ------

  //  ----- states -----
  const [logout_popup, setLogoutPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [state_message, setSatateMessage] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    joined_at: "",
    followers: "",
    following: "",
    posts: "",
  });
  //  ----- states -----

  //  ===== recieves the API response =====
  const ProfileReciever = async () => {
    const res = await FetchProfile(token);
    setProfile({
      username: res.username,
      name: res.name,
      joined_at: res.joined_at,
      posts: res.total_posts,
      followers: res.followers,
      following: res.following,
    });
    setToken(token);
  };
  //  ===== recieves the API response =====

  // ===== displays the logout pop-up =====
  const LogoutPopup = () => {
    setLogoutPopup(true);
  };
  // ===== displays the logout pop-up =====

  // ===== calls the profile setter fn initial load ======
  useEffect(() => {
    ProfileReciever();
  }, []);
  // ===== calls the profile setter fn on initial load ======

  // ===== sets the pop-message state =====
  const Notify = () => {
    setOpen(true);
    setSatateMessage("info");
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  // ===== sets the pop-message state =====

  // ===== edits the profile ======
  const profileEditHandler = () => {
    if (!edit) {
      setEdit(true);
      setDisable(false);
    }
  };
  // ===== edits the profile ======

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  // ===== save the profile changes ======
  const profileChangeSaver = async () => {
    if (edit) {
      setEdit(false);
      setOpen(false);
    }
    const saved_profile = await EditProfile(token, profile["name"]);
    setOpen(true);
    setSatateMessage("success")
    setDisable(true);
  };
  // ===== save the profile changes ======

  return (
    <div className="min-h-screen bg-black pt-6 px-4 md:px-6 xl:px-12">
      {open ? (
        state_message === "info" ? (
          <SnackbarMessage
            openstatus={open}
            hideduration={3000}
            severity={state_message}
            variant={"filled"}
            display_message={"This feature is coming soon"}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {open ? (
        state_message === "success" ? (
          <SnackbarMessage
            openstatus={open}
            hideduration={3000}
            severity={state_message}
            variant={"filled"}
            display_message={"Changes saved"}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}

      <div className="mx-auto max-w-4xl">
        <div className="space-y-6 pb-6">
          {/* Header */}
          <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10">
            <div className="text-center md:text-left mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
                Profile
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-gray-100">
                Your Journey
              </h1>
              <p className="text-gray-400 text-sm md:text-base mt-2">
                Your posts statistics and settings
              </p>
            </div>
          </div>

          {/* User Card and Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* User Card */}
            <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10">
              <div className="flex flex-col items-center">
                <p className="text-xl font-semibold text-gray-100 mb-3">
                  {profile.username ? profile.username : ""}
                </p>

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full  text-2xl font-bold text-black bg-gray-400">
                  {/* {profile.username ? profile.username[0].toUpperCase() : ""} */}
                  <UserRound />
                </div>

                <p className="text-sm font-semibold text-gray-100 mb-1">
                  {profile.name ? profile.name : ""}
                </p>

                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  joined{" "}
                  {profile.joined_at ? FormatJoinDate(profile.joined_at) : ""}
                </p>
                <div className="flex justify-center gap-2 w-full">
                  <button
                    onClick={profileEditHandler}
                    className="border border-gray-600 rounded-lg p-2 w-1/2 mt-4 cursor-pointer"
                  >
                    Edit profile
                  </button>

                  <button
                    disabled={disable}
                    onClick={profileChangeSaver}
                    className="bg-white text-gray-800  rounded-lg p-2 w-1/2 mt-4 cursor-pointer"
                  >
                    Save changes
                  </button>
                </div>
              </div>

              <div className="text-center  py-4">
                {edit ? (
                  <input
                    type="text"
                    name="name"
                    value={profile["name"]}
                    placeholder="set your name"
                    className="p-2 border border-gray-600 rounded-lg w-full"
                    onChange={handleProfileChange}
                    autoFocus
                  />
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-3xl border flex items-center border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10">
              <div className="mb-3 text-xs uppercase tracking-[0.24em] text-gray-400">
                {/* Statistics */}
              </div>
              <div className="grid grid-cols-3 gap-3 ">
                <div className="rounded-2xl md:flex md:justify-center  gap-2 text-center p-4">
                  <p className=" text-2xl font-black text-gray-100">
                    {profile.posts}
                  </p>
                  <p className="text-gray-400 text-[10px] md:text-[11px] uppercase tracking-[0.2em] mt-2">
                    posts
                  </p>
                </div>
                <div className="rounded-2xl md:flex md:justify-center  gap-2 text-center p-4">
                  <p className=" text-2xl font-black text-gray-100">
                    {profile.following}
                  </p>
                  <p className="text-gray-400  text-[10px] md:text-[11px] uppercase tracking-[0.2em] mt-2">
                    following
                  </p>
                </div>
                <div className="rounded-2xl md:flex md:justify-center gap-2 text-center p-4">
                  <p className=" text-2xl font-black text-gray-100">
                    {profile.followers}
                  </p>
                  <p className="text-gray-400 text-[10px] md:text-[11px] uppercase tracking-[0.2em] mt-2">
                    followers
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
                { label: "Invite Friends", icon: <Users /> },
                { label: "Preferences", icon: <SettingsIcon /> },
                { label: "Privacy & Security", icon: <LockIcon /> },
                { label: "About & Help", icon: <HelpCircle /> },
              ].map((item) => (
                <button
                  onClick={Notify}
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
            onClick={LogoutPopup}
            className="bg-[#ffffff] border rounded-lg  border-gray-700 hover:bg-[#0f0f0f] px-4 py-3 text-gray-700 hover:text-gray-100 font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

          {/* renders the logout confirmation component */}
          {logout_popup ? (
            <LogoutConfirmation onCancel={() => setLogoutPopup(false)} />
          ) : (
            ""
          )}
          {/* renders the logout confirmation component */}

          {/* Footer Info */}
          <div className="text-center mb-5 space-y-3">
            <div className="rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
                App Info
              </p>
              <p className="text-sm font-semibold text-gray-300">
                Paragram v1.0
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Made with care in the quiet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
