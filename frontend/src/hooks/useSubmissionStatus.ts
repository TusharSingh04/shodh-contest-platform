import { useState, useEffect, useRef } from 'react';
import { submissionAPI, Submission } from '@/utils/api';

interface UseSubmissionStatusReturn {
  submission: Submission | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Polls submission status every 2 seconds
 * Stops when status is not PENDING
 */
export function useSubmissionStatus(submissionId: number | null): UseSubmissionStatusReturn {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!submissionId) {
      setLoading(false);
      return;
    }

    const pollSubmission = async () => {
      try {
        const data = await submissionAPI.getSubmission(submissionId);
        setSubmission(data);
        setLoading(false);

        // Stop polling if submission is no longer pending
        if (data.status !== 'PENDING' && data.status !== 'RUNNING') {
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }
    };

    // Initial fetch
    pollSubmission();

    // Poll every 2 seconds
    pollingRef.current = setInterval(pollSubmission, 2000);

    // Cleanup on unmount
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [submissionId]);

  return { submission, loading, error };
}
