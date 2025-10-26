import { useState, useEffect, useRef } from 'react';
import { contestAPI } from '@/utils/api';

export interface LeaderboardEntry {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  rank: number;
  acceptedSubmissions: number;
  totalSubmissions: number;
  totalScore: number;
  lastSubmissionAt: string | null;
}

interface UseLeaderboardReturn {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: Error | null;
}

/**
 * Polls leaderboard every 15 seconds
 */
export function useLeaderboard(contestId: string | number | null): UseLeaderboardReturn {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!contestId) {
      setLoading(false);
      return;
    }

    const pollLeaderboard = async () => {
      try {
        const data = await contestAPI.getLeaderboard(contestId);
        setLeaderboard(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        // Continue polling even on error
      }
    };

    // Initial fetch
    pollLeaderboard();

    // Poll every 15 seconds
    pollingRef.current = setInterval(pollLeaderboard, 15000);

    // Cleanup on unmount
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [contestId]);

  return { leaderboard, loading, error };
}
