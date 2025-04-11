FROM node:slim AS base
RUN apk add --update dumb-init
USER node
WORKDIR /app
COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock
RUN yarn

# Install production dependencies only
FROM node:slim AS deps
USER node
WORKDIR /app
COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock
RUN yarn install --production --frozen-lockfile

# Compile typescript sources
FROM base AS build
USER node
WORKDIR /app
COPY --chown=node:node ../tsconfig.json tsconfig.json
COPY --chown=node:node . .
RUN yarn tsc

# Combine production only node_modules with compiled javascript files.
FROM node:slim AS final
RUN apk add --update dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=deps /app/node_modules ./app/node_modules
COPY --chown=node:node --from=build /app/dist ./dist/
COPY --chown=node:node --from=build /app/package.json ./
CMD [ "dumb-init", "node", "/app/dist/index.js" ]