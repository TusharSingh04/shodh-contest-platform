import { Trophy } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';

interface LeaderboardProps {
  contestId: string;
}

export default function Leaderboard({ contestId }: LeaderboardProps) {
  const { leaderboard: entries, loading } = useLeaderboard(contestId);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {entries.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No submissions yet</p>
            </div>
          ) : (
            entries.map((entry, index) => (
              <div
                key={entry.userId}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-400 shadow-sm'
                    : index === 1
                    ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300'
                    : index === 2
                    ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center flex-1">
                  <span
                    className={`font-bold mr-3 w-8 text-center ${
                      index === 0 ? 'text-yellow-700 text-xl' :
                      index === 1 ? 'text-gray-600 text-lg' :
                      index === 2 ? 'text-orange-600 text-lg' :
                      'text-gray-500 text-sm'
                    }`}
                  >
                    #{entry.rank}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{entry.username}</p>
                    <p className="text-xs text-gray-500">
                      {entry.acceptedSubmissions}/{entry.totalSubmissions} solved
                    </p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-green-600">{entry.totalScore}</p>
                  <p className="text-xs text-gray-500">pts</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
