import { Clock, Target } from 'lucide-react';

interface ProblemViewProps {
  problem: {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    points: number;
    timeLimitSeconds: number;
  };
}

export default function ProblemView({ problem }: ProblemViewProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{problem.title}</h2>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <span className="flex items-center text-gray-600">
          <Target className="w-4 h-4 mr-1" />
          {problem.points} points
        </span>
        <span className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          {problem.timeLimitSeconds}s
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          problem.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
          problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {problem.difficulty}
        </span>
      </div>

      <div className="prose max-w-none">
        <div className="text-gray-700 whitespace-pre-line">{problem.description}</div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold mb-2">Example:</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">Input: [2, 7, 11, 15], target = 9
Output: [0, 1]</pre>
        </div>
      </div>
    </div>
  );
}
