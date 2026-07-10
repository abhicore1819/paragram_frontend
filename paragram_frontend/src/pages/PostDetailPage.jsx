import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReactionBar from '../components/ReactionBar';

export default function PostDetailPage({ confession, onUpdateReactions, onBack }) {
  const [replies, setReplies] = useState([
    {
      id: 1,
      author: 'Anonymous',
      text: "You're not alone in this. Many people feel the same way.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isAnonymous: true
    },
    {
      id: 2,
      author: 'Listener',
      text: "It takes courage to admit this. Have you considered talking to someone about it?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isAnonymous: false
    }
  ]);

  const [replyText, setReplyText] = useState('');
  const [replyAsAnonymous, setReplyAsAnonymous] = useState(true);

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const handleReply = () => {
    if (replyText.trim()) {
      const newReply = {
        id: replies.length + 1,
        author: replyAsAnonymous ? 'Anonymous' : 'You',
        text: replyText,
        timestamp: new Date(),
        isAnonymous: replyAsAnonymous
      };
      setReplies([...replies, newReply]);
      setReplyText('');
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gray-900/70 border border-gray-700 text-gray-300 hover:bg-gray-800/70 transition-all duration-200 shadow-sm shadow-gray-900"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-white font-bold text-lg">Confession</h1>
        <div className="w-11 h-11" />
      </div>

      <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-6 mb-6 max-w-md mx-auto shadow-2xl shadow-gray-900/20 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-300 to-gray-200 flex items-center justify-center text-gray-950 font-bold">
            {confession.pseudonym.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {confession.isAnonymous ? '👤 Anonymous' : confession.pseudonym}
            </p>
            <p className="text-xs text-gray-500">{formatTime(confession.timestamp)}</p>
          </div>
        </div>

        <p className="text-gray-300 text-base leading-relaxed mb-6">{confession.text}</p>

        <ReactionBar
          confessionId={confession.id}
          reactions={confession.reactions}
          onReact={onUpdateReactions}
        />
      </div>

      <div className="mb-28 max-w-md mx-auto">
        <h2 className="text-gray-100 font-bold mb-4 flex items-center gap-2 text-lg">Replies ({replies.length})</h2>

        <div className="space-y-3">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 shadow-sm shadow-gray-900">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-300">
                  {reply.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold text-white">
                      {reply.isAnonymous ? '👤 Anonymous' : reply.author}
                    </p>
                    <p className="text-xs text-gray-500">{formatTime(reply.timestamp)}</p>
                  </div>
                  <p className="text-gray-400 text-sm">{reply.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-24 left-0 right-0 p-4 bg-linear-to-t from-black via-black to-transparent">
        <div className="max-w-md mx-auto ">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setReplyAsAnonymous(!replyAsAnonymous)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                replyAsAnonymous
                  ? 'bg-gray-100 text-gray-950'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              {replyAsAnonymous ? '👤 Anonymous' : 'As Me'}
            </button>
          </div>

          <div className="flex gap-2 mb-5">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleReply();
              }}
              placeholder="Share your thoughts..."
              className="flex-1 bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
            <button
              onClick={handleReply}
              disabled={!replyText.trim()}
              className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 text-gray-950 font-bold px-4 py-3 rounded-lg transition-all duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
