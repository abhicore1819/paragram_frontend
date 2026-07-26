import axios from "axios";
const FEED_URL = import.meta.env.VITE_FETCH_FEED;
const FetchFeed = async () => {
  const spliited_token = document.cookie.split("=")
  const [token_key, token_val] = spliited_token
  console.log(token_key, token_val)
  try {
    const feed_request = await axios.get(FEED_URL, {
      headers: { Authorization: `Token ${token_val}` },
    });
    const feed_response = feed_request.data;
    return feed_response;
  } catch (error) {
    console.log("Error occured:- ", error);
  }
};

export default FetchFeed;
