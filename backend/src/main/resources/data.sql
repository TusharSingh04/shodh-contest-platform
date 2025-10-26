-- Sample data for Shodh Contest Platform
-- This file is loaded on application startup

-- Insert sample users
INSERT INTO users (id, username, email, password_hash, created_at) VALUES 
(1, 'testuser', 'test@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', CURRENT_TIMESTAMP),
(2, 'admin', 'admin@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', CURRENT_TIMESTAMP);

-- Insert sample contest
INSERT INTO contests (id, title, description, start_time, end_time, status, created_at) VALUES 
(1, 'Shodh Coding Contest 2024', 'Annual coding competition for students - Test your programming skills with algorithmic challenges!', '2024-01-01 10:00:00', '2024-12-31 23:59:59', 'ACTIVE', CURRENT_TIMESTAMP);

-- Insert sample questions
INSERT INTO questions (id, title, description, difficulty, points, time_limit_seconds, memory_limit_mb, contest_id, created_at) VALUES 
(1, 'Sum of Two Numbers', 'Given two integers a and b, return their sum.\n\nInput: Two integers a and b\nOutput: Print the sum of a and b\n\nExample:\nInput: 5 10\nOutput: 15', 'EASY', 100, 2, 256, 1, CURRENT_TIMESTAMP),
(2, 'Fibonacci Sequence', 'Calculate the nth Fibonacci number.\n\nInput: An integer n (0 ≤ n ≤ 30)\nOutput: Print the nth Fibonacci number\n\nExample:\nInput: 5\nOutput: 5', 'MEDIUM', 200, 3, 512, 1, CURRENT_TIMESTAMP),
(3, 'Binary Search', 'Implement binary search algorithm.\n\nInput: A sorted array and a target value\nOutput: Print the index of target, or -1 if not found\n\nExample:\nInput: 5\n1 2 3 4 5\n3\nOutput: 2', 'HARD', 300, 5, 1024, 1, CURRENT_TIMESTAMP);

-- Insert sample test cases
INSERT INTO test_cases (id, question_id, input_data, expected_output, is_sample, created_at) VALUES 
(1, 1, '5\n10', '15', true, CURRENT_TIMESTAMP),
(2, 1, '3\n7', '10', false, CURRENT_TIMESTAMP),
(3, 1, '0\n0', '0', false, CURRENT_TIMESTAMP),
(4, 2, '5', '5', true, CURRENT_TIMESTAMP),
(5, 2, '10', '55', false, CURRENT_TIMESTAMP),
(6, 3, '5\n1 2 3 4 5\n3', '2', true, CURRENT_TIMESTAMP);

-- Insert sample contest participation
INSERT INTO contest_participations (id, user_id, contest_id, joined_at) VALUES 
(1, 1, 1, CURRENT_TIMESTAMP),
(2, 2, 1, CURRENT_TIMESTAMP);

-- Insert sample submissions
INSERT INTO submissions (id, user_id, question_id, code, language, status, result, score, submitted_at, processed_at) VALUES 
(1, 1, 1, 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}', 'JAVA', 'ACCEPTED', 'All test cases passed', 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 2, 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(fib(n));\n    }\n    public static int fib(int n) {\n        if (n <= 1) return n;\n        return fib(n-1) + fib(n-2);\n    }\n}', 'JAVA', 'WRONG_ANSWER', 'Time limit exceeded on test case 2', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
