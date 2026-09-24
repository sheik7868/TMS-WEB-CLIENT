# CreatedBy : Harish Raj
# CreatedTime : Dec 4 2024
# Description : This file will be read as an instruction by docker to build a image

# Stage 1: Build the application
FROM node:18-slim AS build
WORKDIR /baas-tms-web-client-container

# Copy package.json and .npmrc files for dependency installation
COPY package.json ./ 
COPY .npmrc ./ 


# Install dependencies
RUN npm install --frozen-lockfile


# Copy the rest of the application source code
COPY . .

# RUN npm run unit-test

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-slim
WORKDIR /baas-tms-web-client-container


# Install PM2 globally for process management
RUN npm install pm2 -g

# Labels are key-value pairs stored as a string that can be used to organize your images
LABEL maintaner="Harish Raj"
LABEL email="harish_raj@gove.co"
LABEL release-date="2023-10-30"

# Copy only the necessary files from the previous build stage
COPY --from=build /baas-tms-web-client-container/node_modules ./node_modules
COPY --from=build /baas-tms-web-client-container/.next ./.next
COPY --from=build /baas-tms-web-client-container/public ./public
COPY --from=build /baas-tms-web-client-container/.npmrc ./.npmrc

COPY . .
# Expose the necessary port(s)
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
