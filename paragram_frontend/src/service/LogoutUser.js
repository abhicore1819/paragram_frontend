import axios from "axios";
const LogoutUser = async (token) => {
  const LOGOUT_URL = import.meta.env.VITE_LOGOUT;

  try {
    const logout_request = await axios.post(LOGOUT_URL, {}, {headers:{Authorization: `Token ${token}`}});
    const logout_reponse = logout_request.data;
    document.cookie = 'token=; expires=wed, 02 jan 2001 12:01:00 UTC'
    return logout_reponse;

  } catch (error) {
    console.warn("error occured:-", error);
  }
};

export default LogoutUser;
