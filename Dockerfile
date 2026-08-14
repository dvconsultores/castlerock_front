# Stage 1: Build
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code including .env
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Use the official nginx image's template mechanism: at container start the
# entrypoint runs envsubst on *.template files, substituting ${BACKEND_HOST}
# from the BACKEND_HOST environment variable (set in Railway variables).
COPY nginx.conf /etc/nginx/templates/default.conf.template
RUN sed -i 's|__BACKEND_HOST__|${BACKEND_HOST}|g' /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]