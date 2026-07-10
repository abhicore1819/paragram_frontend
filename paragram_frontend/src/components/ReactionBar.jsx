import { useState } from 'react';

export default function ReactionBar({ confessionId, reactions, onReact }) {
  const [hasReacted, setHasReacted] = useState({});

  const reactionTypes = [
    { key: 'empathy', emoji: '💔', label: 'Empathy' },
    { key: 'shock', emoji: '😱', label: 'Shock' },
    { key: 'regret', emoji: '😔', label: 'Regret' },
    { key: 'noJudgment', emoji: '🤝', label: 'No Judgment' },
    { key: 'funny', emoji: '😂', label: 'Funny' },
  ];

  const handleReact = (reactionKey) => {
    if (!hasReacted[reactionKey]) {
      onReact(confessionId, reactionKey);
      setHasReacted({ ...hasReacted, [reactionKey]: true });
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 px-4 py-3 border border-gray-700 rounded-lg shadow-2xl shadow-gray-900/20 backdrop-blur-xl">
      {reactionTypes.map((reaction) => (
        <button
          key={reaction.key}
          onClick={() => handleReact(reaction.key)}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded transition-all duration-200 ${
            hasReacted[reaction.key]
              ? 'text-gray-950 bg-gray-100'
              : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/70'
          }`}
          title={reaction.label}
        >
          <span className="text-lg">{reaction.emoji}</span>
          <span className="text-xs font-semibold">{reactions[reaction.key]}</span>
        </button>
      ))}
    </div>
  );
}
