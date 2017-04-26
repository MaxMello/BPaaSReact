# Use an official Python runtime as a base image
FROM node:7.9-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
CMD ["npm", "start"]
