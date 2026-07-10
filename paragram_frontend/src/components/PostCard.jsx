import { useState } from "react";
import { ThumbsUp, MessageCircle, Hand, NavigationOff } from "lucide-react";
import user_pfp from "../assets/user_pfp.jpeg";
import { useNavigate } from "react-router-dom";
export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [is_liked, setIsLiked] = useState(false);
  const [is_followed, setIsFollowed] = useState(false);
  const HandleLike = () => {
    if (is_liked === false) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const HandleFollow = () => {
    if (is_followed === false) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  };
  return (
    <div
      onClick={() => navigate(`/postdetail/${post.id}`)}
      className="group bg-[#0f0f0f] border border-gray-700 rounded-xl p-4 mb-12 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/20 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className=" flex items-center justify-center">
            {/* {post.username.charAt(0).toUpperCase()} */}
            <img className=" w-10 h-10  rounded-full" src={user_pfp} alt="" />
          </div>
          <div className="">
            <p className="text-sm font-semibold text-white">{post.username}</p>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
          {/* follow btn div */}
          <div className="  ml-2  flex items-center justify-center">
            <button
              onClick={HandleFollow}
              className="  cursor-pointer py-1 px-3 text-gray-100 border border-gray-700 rounded-lg"
            >
              {is_followed ? "Followed" : "Follow"}
            </button>
          </div>
          {/* follow btn div */}
        </div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-3">
        {post.content}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-700"></div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-2 items-center">
          <ThumbsUp
            fill={is_liked ? "white" : ""}
            onClick={HandleLike}
            color={"gray"}
            size={22}
          />
          <span className="text-xs text-gray-500">
            {post.total_likes} Likes
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <MessageCircle color={"gray"} size={22} />
          <span className="text-xs text-gray-500">
            {post.total_comments} comments
          </span>
        </div>
      </div>
    </div>
  );
}
