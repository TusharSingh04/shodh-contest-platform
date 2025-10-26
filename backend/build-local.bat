@echo off
echo 🔨 Building Shodh Contest Platform Backend...

REM Check if we're in the backend directory
if not exist "pom.xml" (
    echo ❌ Please run this script from the backend directory
    pause
    exit /b 1
)

REM Check if Maven wrapper exists
if not exist "mvnw.cmd" (
    echo ❌ Maven wrapper not found. Please ensure mvnw.cmd exists.
    pause
    exit /b 1
)

REM Clean and build the project
echo 📦 Running Maven clean package...
call mvnw.cmd clean package -DskipTests

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 📁 JAR file location: target\contest-platform-1.0.0.jar
    
    REM List the JAR file
    dir target\*.jar
    
    echo.
    echo 🐳 To build Docker image:
    echo docker build -f Dockerfile.prebuilt -t shodh-backend .
    echo.
    echo 🚀 To run locally:
    echo java -jar target\contest-platform-1.0.0.jar
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

pause
