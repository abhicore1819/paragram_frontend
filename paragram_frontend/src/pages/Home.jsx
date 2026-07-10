import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";
export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [post, setPost] = useState([
    {
      id: 1,
      username: "lucky_shooter12",
      content: "I've been lying to my best friend for 3 years about my job. I'm not actually working at that company anymore, but I'm too ashamed to tell them the truth.",
      timestamp: "18h ago",
      total_comments: 12,
      total_likes: 1212,
      isAnonymous: false,
      userId: "user1",
    },
    {
      id: 2,
      username: "sachin_x_12",
      content: "I deleted all my social media because I realized I was obsessively comparing my life to others. Now I feel like I'm missing out, but I'm too proud to admit I was wrong.",
      timestamp: "18h ago",
      total_comments: 8,
      total_likes: 812,
      isAnonymous: true,
      userId: "user2",
    },
    {
      id: 3,
      username: "adtiyax",
      content: "Sometimes I wonder if I'm a terrible person because I don't feel as much empathy as I should for people's problems.",
      timestamp: "18h ago",
      total_comments: 18,
      total_likes: 180,
      isAnonymous: false,
      userId: "user3",
    },
    {
      id: 4,
      username: "harsh_29",
      content: "I found out my partner is texting their ex-partner. I haven't confronted them because deep down, I'm not sure I even care anymore.",
      timestamp: "18h ago",
      total_comments: 24,
      total_likes: 24,
      isAnonymous: true,
      userId: "user4",
    },
  ]);
  const [displaypost, setDisplaypost] = useState(post);

  useEffect(() => {
    setDisplaypost(post);
  }, [post]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black pt-6 px-4 md:px-6 xl:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="rounded-4xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10 md:flex md:items-end md:justify-between md:gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
                Private post
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-gray-100 mb-3">
                {/* {isMypost ? "My post" : "Paragram"} */}
              </h1>
              <p className="text-gray-400 max-w-2xl text-sm md:text-base">
                {post
                  ? `${post.length} stored memory${post.length !== 1 ? "s" : ""}`
                  : "Share dark thoughts with a private circle. This view shifts to feel more like a native app on your phone."}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-3xl border border-gray-600/50 bg-gray-800/30 px-5 py-3 text-sm font-semibold text-gray-100 shadow-sm shadow-gray-900/20 transition-all hover:border-gray-500 hover:bg-gray-800/50"
            >
              Refresh feed
            </button>
          </div>

          {isRefreshing && (
            <div className="text-center animate-pulse text-slate-500">
              Refreshing...
            </div>
          )}

          {displaypost.length > 0 ? (
            <div className="space-y-4">
              {displaypost.map((post_obj) => (
                <PostCard
                  key={post_obj.id}
                  post={post_obj}

                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-slate-400 text-lg font-semibold mb-2">
                No post yet
              </p>
              <p className="text-slate-500 text-sm text-center max-w-xl">
                {isMypost
                  ? "Start by sharing your first confession to build your private collection."
                  : "Check back later, or add a confession to see it appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
