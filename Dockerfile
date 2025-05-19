# Stage 1: Build
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Pass environment variables as build arguments
ARG VITE_BASE_URL
ARG VITE_BASE_URL_API

# Set environment variables
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_URL_API=$VITE_BASE_URL_API

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create .env file from build arguments
RUN echo "VITE_BASE_URL=${VITE_BASE_URL}\nVITE_BASE_URL_API=${VITE_BASE_URL_API}" > .env

# Build the application
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]