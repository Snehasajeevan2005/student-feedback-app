# --------------------------
# Stage 1: Build React frontend
# --------------------------
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm install --only=production

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# --------------------------
# Stage 2: Backend setup
# --------------------------
FROM node:20-alpine AS backend-build

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --only=production

COPY backend/ ./

# --------------------------
# Stage 3: Final lightweight image
# --------------------------
FROM node:20-alpine

WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Copy frontend build
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Copy cleanup script
COPY cleanup.sh /cleanup.sh
RUN chmod +x /cleanup.sh

# Expose backend port
EXPOSE 5000

# Start container with log cleanup and backend server
CMD ["/bin/sh", "-c", "/cleanup.sh && node backend/server.js"]
