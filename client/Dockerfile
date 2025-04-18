#Build stage
FROM node:slim AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

#Nginx stage
FROM nginx:1.27-alpine-slim AS nginx
WORKDIR /var/www/html
COPY ./*.html .
COPY ./*.css .
COPY --from=build /app/dist .