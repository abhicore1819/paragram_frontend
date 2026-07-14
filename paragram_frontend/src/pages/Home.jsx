import { useState, useEffect, useCallback, useContext } from "react";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";
import AuthProvider from "../components/AuthProvider";
import { AuthContext } from "../components/AuthProvider";
import FetchFeed from "../service/FetchFeed";
import postcssPluginWarning from "tailwindcss";
export default function Home() {
  const data = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [post, setPost] = useState(false);
  const [displaypost, setDisplaypost] = useState(false);
  const [err, setErr] = useState(false);
  const FetchReponse = async () => {
    const response = await FetchFeed();
    setIsRefreshing(true);
    if (response) {
      setPost(response);
      setDisplaypost(true);
      setErr(false);
      setIsRefreshing(false);
    } else {
      setIsRefreshing(false);
      setErr(true);
    }
  };

  useEffect(() => {
    FetchReponse();
    console.log("this is causing two times of fetching...")
  }, []);

  useEffect(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [post]);

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
                Post your real n raw thoughts, experiences with your
                friends{" "}
              </p>
              {/* <p className="text-gray-400 max-w-2xl text-sm md:text-base">
                {displaypost
                  ? `${post.length} stored memory${post.length !== 1 ? "s" : ""}`
                  : "Share dark thoughts with a private circle. This view shifts to feel more like a native app on your phone."}
              </p> */}
            </div>
            <button
              onClick={handleRefresh}
              className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-3xl border border-gray-600/50 bg-gray-800/30 px-5 py-3 text-sm font-semibold text-gray-100 shadow-sm shadow-gray-900/20 transition-all hover:border-gray-500 hover:bg-gray-800/50"
            >
              Refresh feed
            </button>
          </div>
          {isRefreshing && (
            <div className="flex justify-center text-slate-500">
              {/* Refreshing... */}
              <p className="w-8 h-8 fixed animate-spin border-4 border-t-transparent border-gray-100 rounded-full">
                {" "}
              </p>
              <span className=" w-8 h-8 border-4 border-gray-500 rounded-full">
                {" "}
              </span>
            </div>
          )}
          {/* {err && <h1 className="text-center transition duration-200 my-20 lg:text-2xl">{err}</h1>} */}
          {/* err div */}
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
