# Docker file to run 1 app

# Pull base image
FROM node:18-alpine


# Set working directory
WORKDIR /usr/app

# Copy package.json to working directory
COPY ./package.json ./
COPY ./yarn.lock ./

# Install dependencies
RUN yarn

# Copy all files to working directory
COPY ./ ./

# Build
RUN yarn run build

# Add nestjs cli just in case we need it (Failed once without it so now just keep it in meh)
# RUN npm install -g @nestjs/cli


# Set environment variables
ENV PORT=8080

# Expose port 8080
EXPOSE 8080

# Start Nginx and serve application
CMD ["yarn", "run", "start"]