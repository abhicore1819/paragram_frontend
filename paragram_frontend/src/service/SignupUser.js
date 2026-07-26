import axios from "axios";
const SignupUser = async (form) => {
  const SIGNUP_URL = import.meta.env.VITE_SIGNUP;
  try {
    const signup_request = await axios.post(SIGNUP_URL, form);
    const signup_response = signup_request.data;
    return "signedup"
  
  } catch (err) {
    console.log(err);
    return "error"
  }
};

export default SignupUser;
