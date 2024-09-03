# Specify the Node.js version to use as a build argument.
ARG NODE_VERSION=20.15.0

# Use the official Node.js Alpine image as the base image.
FROM node:${NODE_VERSION}-alpine

# Set environment variables.
ENV NODE_ENV production

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Install dependencies only using the package and lock files, and cache the npm cache directory.
COPY package*.json ./
RUN npm ci --omit=dev --cache /root/.npm --prefer-offline

# Copy the rest of the application source code.
COPY . .

# Ensure the application runs as a non-root user.
USER node

# Run the application.
CMD ["npm", "start"]
