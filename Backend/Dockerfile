# Use official Node.js image as base
FROM node:14

# Set working directory inside the container
WORKDIR /app-backend

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to container
COPY . .

# Expose the port your app runs on
EXPOSE 9000

# Command to run the application
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
