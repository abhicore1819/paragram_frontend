export default function Activity() {
  const activities = [
    {
      id: 1,
      type: "reaction",
      user: "adtiyax",
      action: "reacted with 💔 Empathy",
      confession: "Your confession about family",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      type: "reply",
      user: "harsh_29",
      action: "replied to your confession",
      confession: "About personal struggles",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 3,
      type: "reaction",
      user: "lucky_shooter12",
      action: "reacted with 🤝 No Judgment",
      confession: "Your recent confession",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ];

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-black pt-6 px-4 md:px-6 xl:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-4xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Activity</p>
              <h1 className="text-4xl md:text-5xl font-black text-gray-100 mb-3">
                Your Activity
              </h1>
              <p className="text-gray-400 max-w-2xl text-sm md:text-base">
                See who's engaging with your confessions and reactions
              </p>
            </div>
          </div>

          {/* Activity List */}
          {activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-3xl border border-gray-700 bg-[#0f0f0f] p-6 shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/20 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-200 font-bold shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base text-gray-100 font-medium">
                        <span className="font-semibold text-gray-100">{activity.user}</span>{' '}
                        <span className="text-gray-400">{activity.action}</span>
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-2">{activity.confession}</p>
                      <p className="text-xs text-gray-600 mt-3">{formatTime(activity.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-gray-400 text-lg font-semibold mb-2">No activity yet</p>
              <p className="text-gray-500 text-sm text-center max-w-xl">
                Share a confession to start getting reactions and replies from the community
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
