# Dockerfile

FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the local code into the container
COPY . .


# Expose the port that the NestJS server will run on
EXPOSE 3000

# Define the command to run your NestJS app
CMD ["npm", "run", "start"]