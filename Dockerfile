# Stage 1: Build React frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Node.js backend
FROM node:18
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Copy React build into backend's public folder
COPY --from=frontend-build /app/frontend/build ./public

# Expose port backend listens on
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]
