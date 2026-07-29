import { useState, useEffect, useCallback, useContext } from "react";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";
import AuthProvider from "../components/AuthProvider";
import { AuthContext } from "../components/AuthProvider";
import FetchFeed from "../service/FetchFeed";
import FeedSkeleton from "../skeletons/FeedSkeleton";
import postcssPluginWarning from "tailwindcss";
import { toast, ToastContainer } from "react-toastify";
export default function Home() {
  const { logged_in, setLoggedIn, token, setToken, username, setUsername } =
    useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [is_loading, setIsLoading] = useState(false);
  const [post, setPost] = useState(false);
  const [displaypost, setDisplaypost] = useState(false);
  const [err, setErr] = useState(false);

  const FetchReponse = async () => {
    const response = await FetchFeed(token);
    if (response) {
      setPost(response);
      setDisplaypost(true);
      setErr(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setErr(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    FetchReponse();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black pt-6 px-4 md:px-6 xl:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="rounded-4xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10 md:flex md:items-end md:justify-between md:gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-gray-100 mb-3">
                {"Paragram"}
              </h1>
              <p>
                Post your real and raw thoughts, experiences with your
                friends{" "}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-3xl border border-gray-600/50 bg-gray-800/30 px-5 py-3 text-sm font-semibold text-gray-100 shadow-sm shadow-gray-900/20 transition-all hover:border-gray-500 hover:bg-gray-800/50"
            >
              Refresh feed
            </button>
          </div>
          {is_loading && (
            <>
              {[...Array(5)].map((_, index) => (
                <FeedSkeleton key={index} />
              ))}
            </>
          )}
          {/* {is_loading ? <Skeleton width={200} count={2} /> : ""} */}
          {err && (
            <div className="flex justify-center">
              <div className="bg-red-950 border-2 rounded-lg space-y-5 border-red-800 p-5 lg:w-1/2">
                <p className="text-red-400 text-center lg:text-lg">
                  {" "}
                  Unable to load your feed
                </p>
                <p className="text-gray-300 text-center">
                  Oops! Something went wrong while fetching posts. Please check
                  your internet connection and try again in a few moments.
                </p>
              </div>
            </div>
          )}
          {/* err div */}
          {displaypost && (
            <div className="space-y-4">
              {post.map((post_obj) => (
                <PostCard key={post_obj.id} post={post_obj} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
