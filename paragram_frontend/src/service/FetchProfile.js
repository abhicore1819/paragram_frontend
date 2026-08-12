import axios from "axios";
import { useContext } from "react";
const FetchProfile = async (token) => {
  const FETCH_PROFILE_URL = import.meta.env.VITE_FETCH_PROFILE;
  try {
    const fetch_profile = await axios.get(FETCH_PROFILE_URL, {
      headers: { Authorization: `Token ${token}` },
    });
    const profile_response = fetch_profile.data;
    return profile_response;
  } catch (error) {
    console.warn("Error occured:-", error);

    return ("error", error);
  }
};

const EditProfile = async (token, data) => {
  console.log("payload:-", data)
  const EDIT_PROFILE_URL = import.meta.env.VITE_EDIT_PROFILE;
  try {
    const edit_profile = await axios.patch(EDIT_PROFILE_URL, {name: data}, {
      headers: { Authorization: `Token ${token}` },
    });
    const edit_profile_response = edit_profile.data;
    return edit_profile_response;
  } catch (error) {
    console.warn("Error occured:-", error);

    return ("error", error);
  }
};

export { FetchProfile, EditProfile };
