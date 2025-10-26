import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contest API
export const contestAPI = {
  /**
   * Get contest by ID with questions
   */
  getContest: async (contestId: string | number) => {
    const response = await api.get(`/contests/${contestId}`);
    return response.data;
  },

  /**
   * Get all contests
   */
  getAllContests: async () => {
    const response = await api.get('/contests');
    return response.data;
  },

  /**
   * Get contest leaderboard
   */
  getLeaderboard: async (contestId: string | number) => {
    const response = await api.get(`/contests/${contestId}/leaderboard`);
    return response.data;
  },
};

// Submission API
export const submissionAPI = {
  /**
   * Create a new submission
   */
  createSubmission: async (data: {
    code: string;
    language: string;
    userId: number;
    questionId: number;
  }) => {
    const response = await api.post('/submissions', data);
    return response.data;
  },

  /**
   * Get submission by ID
   */
  getSubmission: async (submissionId: string | number) => {
    const response = await api.get(`/submissions/${submissionId}`);
    return response.data;
  },

  /**
   * Get submissions by user
   */
  getUserSubmissions: async (userId: number) => {
    const response = await api.get(`/submissions/user/${userId}`);
    return response.data;
  },

  /**
   * Get submissions by question
   */
  getQuestionSubmissions: async (questionId: number) => {
    const response = await api.get(`/submissions/question/${questionId}`);
    return response.data;
  },
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Types
export interface Submission {
  id: number;
  code: string;
  language: string;
  userId: number;
  questionId: number;
  status: 'PENDING' | 'RUNNING' | 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR';
  result: string;
  score: number;
  submittedAt: string;
  processedAt: string | null;
}

export interface Contest {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: string;
  maxParticipants: number;
  questions: Question[];
}

export interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  timeLimitSeconds: number;
  contestId: number;
}

export default api;
