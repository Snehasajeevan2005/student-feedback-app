# --------------------------
# Stage 1: Build React frontend
# --------------------------
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Install deps only
COPY frontend/package*.json ./
RUN npm install --only=production

# Copy source and build
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

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Cleanup logs at startup
COPY cleanup.sh /cleanup.sh
RUN chmod +x /cleanup.sh

EXPOSE 5000

CMD ["/bin/sh", "-c", "/cleanup.sh && node backend/server.js"]
