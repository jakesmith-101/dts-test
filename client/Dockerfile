#Build stage
FROM node:slim AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

#Production stage
FROM node:slim AS production
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.html"]