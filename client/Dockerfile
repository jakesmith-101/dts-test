#Build stage
FROM node:slim AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

#Nginx stage
FROM nginx:1.27-alpine-slim AS nginx
COPY ./*.html ./var/www/html/.
COPY ./*.css ./var/www/html/.
COPY --from=build /app/dist ./var/www/html