# --------------------------
# Stage 1: Build React frontend
# --------------------------
FROM node:20 AS frontend-build

# Set working directory
WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./

# Fix permissions for react-scripts (to avoid 'Permission denied')
RUN chmod +x node_modules/.bin/react-scripts

# Build React app
RUN npm run build

# --------------------------
# Stage 2: Backend setup
# --------------------------
FROM node:20 AS backend-build

# Set working directory
WORKDIR /app/backend

# Copy package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend code
COPY backend/ ./

# --------------------------
# Stage 3: Final image
# --------------------------
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend from build stage
COPY --from=backend-build /app/backend ./backend

# Copy frontend build output
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Expose your backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "backend/index.js"]
