// ===== imports =====
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, UserRound, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { useContext } from "react";
import { FetchProfile, UpdateProfile } from "../service/FetchProfile";
import SnackbarMessage from "../components/snackbar/SnackBarMessage";
// ===== imports =====

export default function EditProfile() {
  // ----- hooks -----
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const locationData = useLocation();
  // ----- hooks -----

  // ----- states -----
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    dob: "",
    pfp: profileImage,
  });

  const [disable, setDisable] = useState(true);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  // ----- states -----

  // ----- context -----
  const { token, setToken } = useContext(AuthContext);
  // ----- context -----

  // --------------------------
  // fetches profile
  // --------------------------
  const profileHandler = async () => {
    const response = await FetchProfile(token);
    console.log("user profile:-", response);
    console.log("user profile:-", response.dob);
    setFormData({
      dob: response.dob,
      username: response.username,
      bio: response.bio,
      name: response.name,
    });
  };

  // --------------------------
  // calls profile API
  // --------------------------
  useEffect(() => {
    profileHandler();
  }, []);

  // -------------------------------
  // Handle input changes
  // -------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEdit(true);
    setDisable(false);
    console.log("edit state:-", edit);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------------
  // Handle profile picture
  // -------------------------------
  const handleProfilePicture = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const imageUrl = URL.createObjectURL(selectedFile);
    setProfileImage(imageUrl);
  };

  // -------------------------------
  // Save profile
  // -------------------------------
  const handleSave = async () => {
    if (edit) {
      console.log("this condition is true");
      setEdit(false);
      setOpen(false);
      const saved_profile = await UpdateProfile(token, formData);
      setOpen(true);
      setTimeout(() => {
        navigate("/profile");
      }, [2000]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 px-4 py-5 md:px-6">
      {open ? (
        <SnackbarMessage
          openstatus={open}
          hideduration={3000}
          severity={"success"}
          variant={"filled"}
          display_message={"Changes saved"}
        />
      ) : (
        ""
      )}
      <div className="mx-auto w-full max-w-2xl">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#0f0f0f] text-gray-300 transition hover:bg-gray-900 hover:text-white"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Account
            </p>

            <h1 className="text-xl font-bold text-gray-100">Edit Profile</h1>
          </div>

          {/* keeps header balanced */}
          <div className="w-10" />
        </div>

        {/* ================= PROFILE PICTURE ================= */}
        <div className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 md:p-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Profile image */}
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-700 border border-gray-600">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound
                    size={52}
                    strokeWidth={1.5}
                    className="text-gray-300"
                  />
                )}
              </div>

              {/* Camera button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white text-black transition hover:bg-gray-200"
              >
                <Camera size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicture}
                className="hidden"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-gray-200">
              Profile Picture
            </p>
          </div>

          {/* ================= FORM ================= */}
          <div className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-2xl border border-gray-700 bg-black px-4 py-3.5 text-sm text-gray-100 outline-none placeholder:text-gray-600 transition focus:border-gray-400"
              />
            </div>

            {/* Username */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Username
              </label>

              <div className="flex items-center rounded-2xl border border-gray-700 bg-black px-4 focus-within:border-gray-400">
                {/* <span className="text-sm text-gray-500">@</span> */}

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username"
                  className="w-full bg-transparent px-2 py-3.5 text-sm text-gray-100 outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Dob */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Dob
              </label>

              <div className="flex items-center rounded-2xl border border-gray-700 bg-black px-4 focus-within:border-gray-400">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="dob"
                  className="w-full bg-transparent px-2 py-3.5 text-sm text-gray-100 outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Bio
                </label>

                <span className="text-[11px] text-gray-600">
                  {/* {formData.bio.length}/150 */}
                </span>
              </div>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={150}
                rows={4}
                placeholder="Tell people something about yourself..."
                className="w-full resize-none rounded-2xl border border-gray-700 bg-black px-4 py-3.5 text-sm text-gray-100 outline-none placeholder:text-gray-600 transition focus:border-gray-400"
              />
            </div>
          </div>

          {/* ================= SAVE BUTTON ================= */}
          <div className="mt-8">
            <button
              onClick={handleSave}
              disabled={disable}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save changes
            </button>
          </div>
        </div>

        {/* ================= DANGER / SECONDARY SECTION ================= */}
        <div className="mt-4 rounded-3xl border border-gray-700 bg-[#0f0f0f] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Account
          </p>

          <button
            type="button"
            className="mt-4 w-full rounded-2xl border border-gray-700 px-4 py-3 text-left text-sm font-medium text-gray-300 transition hover:border-gray-500 hover:bg-gray-900"
          >
            Change Password
          </button>
        </div>

        {/* ================= FOOTER ================= */}
        <p className="py-6 text-center text-[10px] uppercase tracking-[0.25em] text-gray-600">
          Paragram · Your profile, your identity
        </p>
      </div>
    </div>
  );
}
