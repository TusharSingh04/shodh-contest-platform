import { useEffect, useState } from 'react';
import { contestAPI, submissionAPI } from '@/utils/api';
import { useSubmissionStatus } from '@/hooks/useSubmissionStatus';
import ProblemView from '@/components/ProblemView';
import CodeEditor from '@/components/CodeEditor';
import Leaderboard from '@/components/Leaderboard';
import StatusBadge from '@/components/StatusBadge';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/router';

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  timeLimitSeconds: number;
}

export default function ContestDashboard() {
  const router = useRouter();
  const { contestId } = router.query;
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}');
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const { submission, loading: submissionLoading } = useSubmissionStatus(submissionId);

  useEffect(() => {
    if (contestId) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUsername(storedUser);
      }
      fetchContest();
    }
  }, [contestId]);

  useEffect(() => {
    if (selectedProblem) {
      setCode('public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}');
    }
  }, [selectedProblem]);

  const fetchContest = async () => {
    try {
      const data = await contestAPI.getContest(contestId as string);
      setProblems(data.questions || []);
      if (data.questions?.length > 0) {
        setSelectedProblem(data.questions[0]);
      }
    } catch (error) {
      console.error('Error fetching contest:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProblem) return;

    try {
      const response = await submissionAPI.createSubmission({
        code,
        language: 'java',
        userId: 1, // This should come from auth
        questionId: selectedProblem.id,
      });
      
      setSubmissionId(response.submissionId);
    } catch (error: any) {
      alert('Error submitting code: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentContest');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Contest Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          {/* Column 1: Problems */}
          <div className="lg:col-span-1 overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Problems</h2>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedProblem?.id === problem.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-gray-900">{problem.title}</span>
                      <StatusBadge difficulty={problem.difficulty} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600 font-medium">{problem.points} pts</span>
                      <span className="text-gray-500">{problem.timeLimitSeconds}s</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Code Editor & Problem View */}
          <div className="lg:col-span-1 flex flex-col space-y-4 overflow-hidden">
            {selectedProblem ? (
              <>
                {/* Problem View */}
                <div className="bg-white rounded-lg shadow-lg flex-1 overflow-hidden flex flex-col">
                  <ProblemView problem={selectedProblem} />
                </div>

                {/* Code Editor */}
                <div className="bg-white rounded-lg shadow-lg flex-1 overflow-hidden">
                  <CodeEditor 
                    code={code} 
                    onChange={setCode} 
                    onSubmit={handleSubmit}
                    disabled={submissionLoading}
                  />
                </div>

                {/* Submission Status */}
                {submission && (
                  <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    submission.status === 'ACCEPTED' ? 'bg-green-50 border-green-400' :
                    submission.status === 'WRONG_ANSWER' ? 'bg-red-50 border-red-400' :
                    submission.status === 'TIME_LIMIT_EXCEEDED' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">Submission Status</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        submission.status === 'ACCEPTED' ? 'bg-green-600 text-white' :
                        submission.status === 'WRONG_ANSWER' ? 'bg-red-600 text-white' :
                        submission.status === 'TIME_LIMIT_EXCEEDED' ? 'bg-yellow-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{submission.result}</p>
                    {submission.score > 0 && (
                      <p className="text-sm font-bold text-green-700 mt-2">
                        ✅ Score: {submission.score} points
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500 h-full flex items-center justify-center">
                Select a problem to start
              </div>
            )}
          </div>

          {/* Column 3: Leaderboard */}
          <div className="lg:col-span-1 overflow-hidden">
            <Leaderboard contestId={contestId as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
