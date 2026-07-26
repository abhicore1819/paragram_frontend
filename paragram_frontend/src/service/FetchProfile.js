import axios from "axios";
import { useContext } from "react";
const FetchProfile = async (token) => {
  const FETCH_PROFILE_URL = import.meta.env.VITE_FETCH_PROFILE;
  try {
    const fetch_profile = await axios.get(FETCH_PROFILE_URL, {
      headers: { Authorization: `Token ${token}` },
    });
    const profile_response = fetch_profile.data;
    return profile_response
    console.log("profile data:-", profile_response);
  } catch (error) {
    console.warn("Error occured:-", error);
  }
};

export default FetchProfile;
