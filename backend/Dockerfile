# Use a lightweight JDK base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built jar file into the container
COPY target/*.jar app.jar

# Create directory for code files (shared with code-runner)
RUN mkdir -p /app/code-files

# Expose backend port
EXPOSE 8080

# Set JVM options for container environment
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Start the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]