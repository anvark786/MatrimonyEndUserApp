# Use official Node.js Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock before other files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Set environment variable for polling
ENV CHOKIDAR_USEPOLLING=true

# Expose port 3000
EXPOSE 3000

# Start React development server
CMD ["yarn", "start"]
