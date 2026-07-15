import axios from "axios";
const FEED_URL = import.meta.env.VITE_FETCH_FEED;
const FetchFeed = async () => {
  console.log("backend url:-", FEED_URL);
  try {
    const feed_request = await axios.get(FEED_URL);
    console.log("backend url:-", FEED_URL);
    const feed_response = feed_request.data;
    console.log("response:-", feed_response);
    return feed_response;
  } catch (error) {
    console.log("Error occured:- ", error);
  }
};

export default FetchFeed;
