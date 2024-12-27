import { Calendar, Heart, TrendingUp, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { calculateImpactScore, getDonorRankings } from "@/lib/api/donorRankingsApi";
import { cn } from "@/lib/utils";

interface DonorRanking {
  id: string;
  name: string;
  totalDonated: number;
  donationCount: number;
  impactScore: number;
  streak: number;
}

export function DonorLeaderboard() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('monthly');
  const [rankings, setRankings] = useState<DonorRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDonorRankings(timeframe);
        setRankings(data);
      } catch (err) {
        setError('Failed to load rankings');
        console.error('Error fetching rankings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, [timeframe]);

  const getImpactBadge = (impactScore: number) => {
    if (impactScore >= 1000) return '🌟 Champion';
    if (impactScore >= 500) return '💫 Hero';
    if (impactScore >= 100) return '💝 Friend';
    return '💗 Supporter';
  };

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="text-center text-red-400 py-8">
          <p>{error}</p>
          <button
            onClick={() => setTimeframe(timeframe)}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Impact Leaders
        </h2>
        <div className="flex gap-2">
          {(['weekly', 'monthly', 'allTime'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              disabled={isLoading}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                timeframe === t
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {t === 'allTime' ? 'All Time' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-1/3" />
                </div>
                <div className="h-8 bg-gray-700 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {rankings.map((donor, index) => (
            <div
              key={donor.id}
              className={cn(
                "bg-white/5 rounded-lg p-4 transition-colors",
                index === 0 && "bg-yellow-500/10 border border-yellow-500/50",
                index === 1 && "bg-gray-400/10 border border-gray-400/50",
                index === 2 && "bg-amber-600/10 border border-amber-600/50"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold",
                    index === 0 && "bg-yellow-500 text-black",
                    index === 1 && "bg-gray-400 text-black",
                    index === 2 && "bg-amber-600 text-black",
                    index > 2 && "bg-gray-700 text-white"
                  )}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{donor.name}</h3>
                    <span className="text-sm text-indigo-400">
                      {getImpactBadge(donor.impactScore)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    ${donor.totalDonated.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    {donor.donationCount} donations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-400" />
                  <span>Impact Score: {donor.impactScore}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>{donor.streak} day streak</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/50 rounded-lg">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <TrendingUp className="h-5 w-5" />
          <h3 className="font-medium">How Impact Scores Work</h3>
        </div>
        <p className="text-sm text-gray-400">
          Impact scores are calculated based on donation amount (0.1 points per dollar), 
          frequency (5 points per donation), and consistency (10 points per day streak). 
          Maintain a donation streak and help more people to increase your score!
        </p>
      </div>
    </div>
  );
}