#!/bin/bash

# Build script for Shodh Contest Platform Backend

echo "🔨 Building Shodh Contest Platform Backend..."

# Check if Maven is available
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven not found. Please install Maven first."
    exit 1
fi

# Clean and build the project
echo "📦 Running Maven clean package..."
mvn clean package -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 JAR file location: target/contest-platform-1.0.0.jar"
    
    # List the JAR file
    ls -la target/*.jar
    
    echo ""
    echo "🐳 To build Docker image:"
    echo "docker build -t shodh-backend ."
    echo ""
    echo "🚀 To run locally:"
    echo "java -jar target/contest-platform-1.0.0.jar"
else
    echo "❌ Build failed!"
    exit 1
fi
