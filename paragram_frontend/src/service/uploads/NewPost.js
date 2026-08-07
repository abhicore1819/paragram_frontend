import axios from "axios";
const AddPost = async (text, token) => {
  const payload = { content: text };
  try {
    const ADD_POST_URL = import.meta.env.VITE_CREATE_POST;
    const add_post_request = await axios.post(ADD_POST_URL, payload, {
      headers: { Authorization: `Token ${token}` },
    });
    const add_post_response = add_post_request.data;
    console.log(add_post_response);
    return add_post_response;
  } catch (error) {
    console.log("error occured:-", error);
    return ("error occured:-", error);
  }
};

export default AddPost;
