# Use official Node.js image as base
FROM node:14

# Set working directory inside the container
WORKDIR /app-frontend

# Copy package.json and package-lock.json to container
COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Command to run the Angular development server
CMD ["npm", "start"]
