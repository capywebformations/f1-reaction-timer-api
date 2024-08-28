# Use Node.js LTS version as base
FROM node:lts-slim

# Set working directory
WORKDIR /home/node/app

# Install dependencies
COPY ./api/package*.json ./

RUN npm install

COPY ./api .

# Build the TypeScript project
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD npm run dev
