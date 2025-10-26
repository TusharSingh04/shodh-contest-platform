# 🚀 Render Deployment Guide

## ✅ **DOCKERFILE FIXED - Ready for Render Deployment**

The Docker image issue has been resolved! The problem was using outdated Maven Docker images.

### **🔧 What Was Fixed:**

1. **Updated Maven Base Image**: `maven:3.9.6-eclipse-temurin-17-slim`
2. **Updated Runtime Image**: `eclipse-temurin:17-jdk-slim`
3. **Multi-stage Build**: Builds JAR inside Docker container

### **📁 Available Dockerfiles:**

- ✅ `backend/Dockerfile` - **Main (Recommended for Render)**
- ✅ `backend/Dockerfile.simple` - For pre-built JARs
- ✅ `backend/Dockerfile.alternative` - Alternative approach
- ✅ `backend/Dockerfile.stable` - Most stable approach

### **🚀 Render Deployment Steps:**

1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Build Command**: `cd backend && docker build -t shodh-backend .`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Root Directory**: Leave empty (uses project root)

3. **Environment Variables** (if needed):
   ```
   SPRING_PROFILES_ACTIVE=production
   DATABASE_URL=your_database_url
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy

### **🔧 Alternative: Manual Build & Deploy**

If you prefer to build locally first:

```bash
# Build the JAR locally
cd backend
./mvnw.cmd clean package

# Use the simple Dockerfile
docker build -f Dockerfile.simple -t shodh-backend .
```

### **📋 Troubleshooting:**

- **Build Fails**: Use `Dockerfile.stable` (most reliable)
- **Memory Issues**: Adjust `JAVA_OPTS` in Dockerfile
- **Database Connection**: Set `DATABASE_URL` environment variable

### **🎯 Next Steps:**

1. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Fix Dockerfile for Render deployment"
   git push
   ```

2. **Deploy on Render**:
   - Use the updated `backend/Dockerfile`
   - Render will handle the rest automatically

The deployment should now work successfully! 🎉
