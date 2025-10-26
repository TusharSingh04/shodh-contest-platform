import { useRouter } from 'next/router';
import { useState } from 'react';
import { Clipboard, User, Lock, Trophy } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [contestId, setContestId] = useState('1');
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('password');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (contestId && username && password) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({ username, password }));
      router.push(`/join?contestId=${contestId}&username=${username}`);
    }
  };

  const handleQuickLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shodh Contest Platform</h1>
          <p className="text-gray-600">Enter Contest ID, Username and Password</p>
        </div>

        {/* Quick Login Buttons */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Quick Login:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('testuser', 'password')}
              className="px-3 py-2 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors"
            >
              Test User
            </button>
            <button
              onClick={() => handleQuickLogin('admin', 'password')}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
            >
              Admin User
            </button>
          </div>
        </div>

        <form onSubmit={handleJoin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contest ID
            </label>
            <input
              type="text"
              value={contestId}
              onChange={(e) => setContestId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Contest ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            <Clipboard className="w-4 h-4 mr-2" />
            Join Contest
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Test Credentials:</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Contest ID:</strong> 1</p>
            <p><strong>Username:</strong> testuser | Password: password</p>
            <p><strong>Username:</strong> admin | Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
}