# Step 1: Build the React app
FROM node:lts-bullseye AS build  

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . . 
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:1.21
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
