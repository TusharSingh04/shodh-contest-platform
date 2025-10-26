# Shodh Contest Platform

A full-stack competitive programming platform built with Spring Boot and Next.js, featuring real-time code execution, live leaderboards, and Docker-based code judgment.

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose 
- Java 17+ (for local backend development)
- Node.js 18+ (for local frontend development)
- Maven 3.6+ (for local backend development)

### Build and Run with Docker

```bash
# Clone the repository
git clone <repository-url>
cd shodh-contest-platform

# Start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/api/health
- **Database**: localhost:5432 (PostgreSQL)
- **Redis**: localhost:6379

### Local Development

#### Backend

```bash
cd backend

# Install dependencies (Maven wrapper will download automatically)
./mvnw.cmd install

# Run the application
./mvnw.cmd spring-boot:run
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Contest Endpoints

#### GET /api/contests
Get all contests.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Weekly Coding Challenge",
    "description": "Algorithmic problems of varying difficulty",
    "startTime": "2024-01-15T10:00:00",
    "endTime": "2024-01-15T12:00:00",
    "durationMinutes": 120,
    "status": "ACTIVE",
    "maxParticipants": 100
  }
]
```

#### GET /api/contests/{contestId}
Get contest details with questions.

**Response:**
```json
{
  "id": 1,
  "title": "Weekly Coding Challenge",
  "description": "...",
  "questions": [
    {
      "id": 1,
      "title": "Two Sum",
      "description": "...",
      "difficulty": "EASY",
      "points": 100,
      "timeLimitSeconds": 2,
      "testCases": [...]
    }
  ]
}
```

#### GET /api/contests/{contestId}/leaderboard
Get contest leaderboard ranked by accepted submissions.

**Response:**
```json
[
  {
    "userId": 1,
    "username": "john_doe",
    "rank": 1,
    "acceptedSubmissions": 5,
    "totalSubmissions": 8,
    "totalScore": 500,
    "lastSubmissionAt": "2024-01-15T11:30:00"
  }
]
```

### Submission Endpoints

#### POST /api/submissions
Create a new submission.

**Request:**
```json
{
  "code": "public class Solution { public static void main(String[] args) { ... } }",
  "language": "java",
  "userId": 1,
  "questionId": 1
}
```

**Response:**
```json
{
  "submissionId": 123,
  "status": "PENDING",
  "message": "Submission created successfully"
}
```

#### GET /api/submissions/{submissionId}
Get submission status and results.

**Response:**
```json
{
  "id": 123,
  "code": "...",
  "language": "java",
  "userId": 1,
  "questionId": 1,
  "status": "ACCEPTED",
  "result": "All test cases passed!",
  "score": 100,
  "submittedAt": "2024-01-15T11:00:00",
  "processedAt": "2024-01-15T11:00:05"
}
```

### Status Codes

- `ACCEPTED` - All test cases passed
- `WRONG_ANSWER` - Incorrect output
- `TIME_LIMIT_EXCEEDED` - Execution timeout
- `RUNTIME_ERROR` - Runtime exception
- `COMPILATION_ERROR` - Compilation failed
- `PENDING` - Awaiting judgment
- `RUNNING` - Currently being judged

## 🏗️ System Design Overview

### Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│  PostgreSQL  │
│  (Next.js)   │     │ (Spring Boot) │     │   Database    │
└──────────────┘     └──────────────┘     └──────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │   Redis      │
                       │   (Cache)    │
                       └──────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │   Docker     │
                       │   Containers │
                       │  (Code Exec) │
                       └──────────────┘
```

### Backend Workflow

#### 1. Submission Processing

```
User Submits Code
    ↓
Submission Created (PENDING)
    ↓
Queue for Judgment
    ↓
Docker Container Created
    ↓
Code Compiled (javac)
    ↓
Test Cases Executed
    ↓
Output Comparison
    ↓
Database Updated (Status + Score)
    ↓
Container Cleanup
```

#### 2. Database Schema

```
Users ──┬──► Contest Participations ──► Contests
        │
        └──► Submissions ──► Questions ──► Test Cases
```

#### 3. Docker-Based Code Execution

**CodeJudgeService** handles secure code execution:

1. **Container Creation**: Isolated Docker container for each submission
2. **Volume Mounting**: Shared volume for code files
3. **Compilation**: Java code compiled inside container
4. **Execution**: Test cases run with stdin/stdout capture
5. **Resource Limits**: Memory (128MB) and CPU (0.5 cores) constraints
6. **Timeout Enforcement**: Configurable per question
7. **Cleanup**: Automatic container removal after execution

**Security Features**:
- Process isolation
- Resource limits (memory, CPU)
- Timeout enforcement
- No network access
- Read-only file system except mounted volumes

### Frontend Polling

#### Submission Status Polling

```typescript
useSubmissionStatus(submissionId)
  ↓
Polls every 2 seconds
  ↓
Stops when status ≠ PENDING/RUNNING
  ↓
Updates UI in real-time
```

#### Leaderboard Polling

```typescript
useLeaderboard(contestId)
  ↓
Polls every 15 seconds
  ↓
Continues indefinitely
  ↓
Shows live rankings
```

### Key Components

#### Backend

- **Models**: User, Contest, Question, TestCase, Submission
- **Repositories**: Spring Data JPA with custom queries
- **Services**: ContestService, SubmissionService, CodeJudgeService
- **Controllers**: REST endpoints for all operations

#### Frontend

- **Pages**: Home, Join, Contest Dashboard
- **Components**: ProblemView, CodeEditor, Leaderboard, StatusBadge
- **Hooks**: useSubmissionStatus, useLeaderboard
- **API**: Axios-based API client

## 🎯 Features

### Implemented

- ✅ User authentication (basic)
- ✅ Contest management
- ✅ Problem submission
- ✅ Docker-based code execution
- ✅ Real-time status updates (2s polling)
- ✅ Live leaderboard (15s polling)
- ✅ Test case validation
- ✅ Resource limits (memory, CPU, timeout)
- ✅ Multiple test cases per problem
- ✅ Hidden and visible test cases
- ✅ Submission history

### Technical Highlights

- **Docker Isolation**: Secure code execution in containers
- **Process Management**: Automatic container lifecycle
- **Error Handling**: Comprehensive error recovery
- **Real-time Updates**: Polling-based live updates
- **Responsive Design**: Tailwind CSS styling
- **Type Safety**: Full TypeScript coverage
- **API Design**: RESTful endpoints with DTOs

## 📊 Data Flow

### Contest Participation Flow

```
1. User enters Contest ID + Username
2. Frontend stores in localStorage
3. Contest data fetched from backend
4. User enters contest dashboard
5. Problems loaded for the contest
6. User selects problem and writes code
7. Code submitted via API
8. Backend creates submission (PENDING)
9. Docker container starts code execution
10. Test cases run with timeout
11. Results compared and status updated
12. Frontend polls status (every 2s)
13. UI updates with final result
14. Leaderboard updates (every 15s)
```

## 🎨 Frontend Pages

### 1. Home Page (/)
- Contest ID and Username entry form
- Minimal, gradient design
- Navigation to contest dashboard

### 2. Join Page (/join)
- Contest confirmation
- Details display
- Join button

### 3. Contest Dashboard (/contest/[contestId])
- **3-Column Layout**:
  - Left: Problems list
  - Middle: Problem view + Code editor + Status
  - Right: Live leaderboard
- Real-time submission status
- Live leaderboard updates

## 🐳 Docker Services

### Backend Service
- Spring Boot application
- Port: 8080
- Database: PostgreSQL
- Code execution: Integrated

### Frontend Service
- Next.js application
- Port: 3000
- API proxy configuration
- Real-time updates

### Code Runner Service
- OpenJDK 17 container
- Shared volume for code files
- Resource limits: 512MB memory, 0.5 CPU
- Always running for quick execution

### PostgreSQL
- Port: 5432
- Database: shodh_contest
- Migrations: Flyway

### Redis
- Port: 6379
- Caching and session management

### Nginx
- Ports: 80, 443
- Reverse proxy
- Load balancing

## 🔧 Configuration

### Environment Variables

#### Backend
```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/shodh_contest
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=mySecretKey
JWT_EXPIRATION=86400000
```

#### Frontend
```properties
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Resource Limits

- **Submission Memory**: 128MB
- **Submission CPU**: 0.5 cores
- **Submission Timeout**: Configurable per question
- **Code Runner Memory**: 512MB
- **Code Runner CPU**: 0.5 cores

## 🚨 Assumptions

1. **Java Only**: Currently supports Java submissions
2. **Local Docker**: Docker daemon running on same machine
3. **No Authentication**: Basic username-based identification
4. **Single Contest**: One active contest at a time
5. **Synchronous Processing**: Sequential test case execution
6. **No Webhooks**: Polling-based updates instead of server-sent events
7. **Basic Security**: Container-based isolation sufficient

## 🛣️ Next Steps

### Short-term Improvements

1. **Authentication**: JWT-based user authentication
2. **Multiple Languages**: Support for Python, C++, JavaScript
3. **WebSockets**: Replace polling with WebSocket connections
4. **Job Queue**: Use RabbitMQ/Redis for submission processing
5. **Rate Limiting**: Prevent abuse with submission limits
6. **Error Logging**: Comprehensive logging and monitoring

### Medium-term Enhancements

1. **Email Notifications**: Send results via email
2. **Code Templates**: Pre-filled code for each problem
3. **Syntax Highlighting**: Multiple language support in editor
4. **File I/O**: Support for file-based problems
5. **Scoring System**: Weighted scoring based on difficulty
6. **Time Tracking**: Track time spent on each problem

### Long-term Goals

1. **Multi-tenancy**: Support multiple organizations
2. **Analytics Dashboard**: Contest statistics and analytics
3. **Social Features**: Comments, discussions, sharing
4. **Mobile App**: React Native mobile application
5. **CI/CD Pipeline**: Automated deployment
6. **Load Balancing**: Horizontal scaling support

### Security Enhancements

1. **Input Sanitization**: Validate and sanitize all inputs
2. **SQL Injection Prevention**: Parameterized queries
3. **XSS Protection**: Content Security Policy
4. **HTTPS**: SSL/TLS encryption
5. **Secrets Management**: External secrets management
6. **Audit Logging**: Track all user actions

## 📦 Project Structure

```
shodh-contest-platform/
├── backend/
│   ├── src/main/java/com/shodh/contestplatform/
│   │   ├── model/          # Entity models
│   │   ├── repository/     # JPA repositories
│   │   ├── service/        # Business logic
│   │   ├── controller/     # REST controllers
│   │   ├── dto/            # Data transfer objects
│   │   └── hooks/          # React hooks
│   ├── src/main/resources/
│   │   ├── application.yml # Configuration
│   │   ├── data.sql        # Sample data
│   │   └── db/migration/    # Flyway migrations
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/          # Next.js pages
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utilities (API client)
│   │   └── styles/         # CSS files
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
└── README.md
```

## 🧪 Testing

### Manual Testing

```bash
# Test contest creation
curl -X POST http://localhost:8080/api/contests \
  -H "Content-Type: application/json" \
  -d '{ "title": "Test Contest", ... }'

# Test submission creation
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{ "code": "...", "language": "java", ... }'

# Test leaderboard
curl http://localhost:8080/api/contests/1/leaderboard
```

### Frontend Testing

1. Navigate to http://localhost:3000
2. Enter Contest ID and Username
3. Join contest
4. Select a problem
5. Write and submit code
6. Observe real-time status updates
7. Check leaderboard updates

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for competitive programming** 🚀
