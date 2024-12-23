import { Home, TrendingUp, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface Participant {
  id: string;
  name: string;
  total_received: number;
  housing_fund: number;
  donation_count: number;
}

interface ParticipantLeaderboardProps {
  participants: Participant[];
}

export function ParticipantLeaderboard({ participants }: ParticipantLeaderboardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Top Participants
        </h3>
      </div>
      <div className="space-y-4">
        {participants.map((participant, index) => (
          <Link
            key={participant.id}
            to={`/admin/participants/${participant.id}`}
            className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  index === 0 ? "bg-yellow-500 text-black" :
                  index === 1 ? "bg-gray-300 text-black" :
                  index === 2 ? "bg-amber-600 text-white" :
                  "bg-gray-700 text-white"
                )}>
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-white">{participant.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      ${participant.total_received.toFixed(2)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      ${participant.housing_fund.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-400">
                  {participant.donation_count} donations
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}