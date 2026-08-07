import axios from "axios";
import { PodiumIcon } from "lucide-react";

const CreateLike = async (post_id, token) => {
  const LIKE_URL = import.meta.env.VITE_CREATELIKE;
  try {
    const create_like_request = await axios.post(
      LIKE_URL,
      { liked: post_id },
      { headers: { Authorization: `Token ${token}` } },
    );
    
    const create_like_response = create_like_request.data;
    return create_like_response;
  } catch (error) {
    console.warn("error:-", error);
    return "error" + error;
  }
};

const RemoveLike = async (post_id, token) => {
  const REMOVELIKE_URL = import.meta.env.VITE_REMOVELIKE;
  const config = {
    headers: { Authorization: `Token ${token}` },
    data: { post_id: post_id },
  };
  try {
    const remove_like_request = await axios.delete(REMOVELIKE_URL, config);
    const remove_like_response = remove_like_request.data;
    return remove_like_response;
  } catch (error) {
    console.warn("error:-", error);
    return "error" + error;
  }
};

export { CreateLike, RemoveLike };
