# CreatedBy : sushma
# CreatedTime : sep 24 2026
# Description : This file will be read as an instruction by docker to build a image

# Stage 1: Build the application
FROM node:18-slim AS build
WORKDIR /baas-tms-web-client-container

# Copy package.json and .npmrc files for dependency installation
COPY package.json ./ 

# Install dependencies
RUN npm install 


# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-slim
WORKDIR /baas-tms-web-client-container

# Copy only the necessary files from the previous build stage
COPY --from=build /baas-tms-web-client-container/node_modules ./node_modules
COPY --from=build /baas-tms-web-client-container/.next ./.next
COPY --from=build /baas-tms-web-client-container/public ./public

COPY . .
# Expose the necessary port(s)
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
