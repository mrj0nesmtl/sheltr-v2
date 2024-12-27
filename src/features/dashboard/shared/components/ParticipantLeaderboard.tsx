interface ParticipantLeaderboardProps {
  participants: any[]; // We'll type this properly later
}

export const ParticipantLeaderboard = ({ participants }: ParticipantLeaderboardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Participant Leaderboard</h3>
      {/* Placeholder content */}
      <div className="text-gray-400">Coming Soon</div>
    </div>
  );
}; 