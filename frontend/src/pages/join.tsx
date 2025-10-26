import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { contestAPI } from '@/utils/api';
import { ArrowLeft, Loader, LogIn } from 'lucide-react';

interface Contest {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function JoinPage() {
  const router = useRouter();
  const { contestId, username } = router.query;
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contestId) {
      fetchContest();
    }
  }, [contestId]);

  const fetchContest = async () => {
    try {
      const data = await contestAPI.getContest(contestId as string);
      setContest(data);
    } catch (error) {
      console.error('Error fetching contest:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = () => {
    if (contestId && username) {
      // Store user info in localStorage
      localStorage.setItem('currentContest', contestId as string);
      localStorage.setItem('currentUser', username as string);
      router.push(`/contest/${contestId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contest not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{contest.title}</h1>
            <p className="text-gray-600">{contest.description}</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                  Contest ID
                </span>
                <p className="text-2xl font-bold text-gray-900">{contest.id}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                  Username
                </span>
                <p className="text-2xl font-bold text-gray-900">{username}</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4 border border-blue-100">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                {contest.status}
              </span>
            </div>
          </div>

          <button
            onClick={handleJoin}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Enter Contest Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
