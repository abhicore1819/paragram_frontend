import axios from "axios";
const Login = async ({ username, password }) => {
  console.log("signup page payload:-", username, password);
  const LOGIN_URL = import.meta.env.VITE_LOGIN;
  const login_request = await axios.post(LOGIN_URL, {
    username: username,
    password: password,
  });

  try {
    const login_response = login_request.data;
    document.cookie = `token=${login_response.token}`;
    return login_response.token;
  } catch (err) {

  }
};

export default Login;
