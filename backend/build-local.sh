#!/bin/bash

# Build script for Shodh Contest Platform Backend
echo "🔨 Building Shodh Contest Platform Backend..."

# Check if we're in the backend directory
if [ ! -f "pom.xml" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Check if Maven wrapper exists
if [ ! -f "mvnw" ]; then
    echo "❌ Maven wrapper not found. Please ensure mvnw exists."
    exit 1
fi

# Make mvnw executable
chmod +x mvnw

# Clean and build the project
echo "📦 Running Maven clean package..."
./mvnw clean package -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 JAR file location: target/contest-platform-1.0.0.jar"
    
    # List the JAR file
    ls -la target/*.jar
    
    echo ""
    echo "🐳 To build Docker image:"
    echo "docker build -f Dockerfile.prebuilt -t shodh-backend ."
    echo ""
    echo "🚀 To run locally:"
    echo "java -jar target/contest-platform-1.0.0.jar"
else
    echo "❌ Build failed!"
    exit 1
fi
