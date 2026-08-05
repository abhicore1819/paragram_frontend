import axios from "axios";
import { createMemoryRouter } from "react-router-dom";
const LoginUser = async ({ username, password }) => {
  const LOGIN_URL = import.meta.env.VITE_LOGIN;
  try {
    const login_request = await axios.post(LOGIN_URL, {
      username: username,
      password: password,
    });
    const login_response = login_request.data;
    document.cookie = `token=${login_response.token}; expires=Thu, 12 jan 2027 12:00:00 UTC`;
    return login_response.token;
  } catch (err) {
    console.log("login error:-", err);
    return "error";
  }
};

export default LoginUser;
