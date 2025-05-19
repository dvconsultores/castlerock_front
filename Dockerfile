# Stage 1: Build
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application with environment variables
ARG VITE_BASE_URL
ARG VITE_BASE_URL_API
RUN echo "VITE_BASE_URL=${VITE_BASE_URL}" > .env && \
    echo "VITE_BASE_URL_API=${VITE_BASE_URL_API}" >> .env && \
    npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]