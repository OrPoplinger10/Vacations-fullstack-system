# Building the image

# Linux Alpine - latest version (not good for us)
# From alpine

# Linux Alpine 3.17.x
# FROM alpine:3.17

# Linux Alpine 3.17.x + Node.js 18.x
FROM node:18-alpine3.17

# Run command in a terminal when image is building - Install global libraries:
RUN npm i -g ts-node

# Create our application directory:
WORKDIR /app

# Copy only package,json and package-lock.json into /app:
COPY package*.json /app

# Restore node_modules:
RUN npm i

# Take current directory and copy it into /app inside the image:
COPY . /app

# ------------------
# Running the container:

# when contaniner runs - which command should we use to run or app:
ENTRYPOINT npm start


