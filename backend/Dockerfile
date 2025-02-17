# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependencies files and install
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
