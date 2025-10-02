# --------------------------
# Stage 1: Build React frontend
# --------------------------
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Copy frontend package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of frontend code and build React
COPY frontend/ ./
RUN npm run build

# --------------------------
# Stage 2: Build Node.js backend
# --------------------------
FROM node:18
WORKDIR /app/backend

# Copy backend package.json and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend code
COPY backend/ ./

# Copy React build into backend's public folder (Node serves it)
COPY --from=frontend-build /app/frontend/build ./public

# Expose the port your backend listens on
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
