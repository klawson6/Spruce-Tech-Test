# Base image with non-root user
FROM node:24.13-alpine3.23 AS base

WORKDIR /app

RUN addgroup -g 1001 -S runner && \
    adduser -S runner -u 1001 -h /home/runner -G runner && \
    chown -R runner:runner /app/

# Image with only dependencies for runtime
FROM base AS app-deps

COPY --parents package.json package-lock.json ./client/package.json ./client/package-lock.json ./server/package.json ./server/package-lock.json /app/

RUN npm ci --ignore-scripts --prefix client
RUN npm ci --ignore-scripts --prefix server --omit=dev

# Image with all dependencies for tests etc
FROM base AS build-deps

COPY --parents package.json package-lock.json ./client/package.json ./client/package-lock.json ./server/package.json ./server/package-lock.json /app/

RUN npm ci --ignore-scripts --prefix client
RUN npm ci --ignore-scripts --prefix server

# Image with fully built app
FROM build-deps AS build

COPY . .

RUN npm run build

# Runnable image of our app
FROM base AS app

COPY --from=app-deps /app/server/node_modules ./node_modules
COPY --from=build /app/server/dist ./dist
COPY --from=build /app/server/public ./public

EXPOSE 8080

CMD ["node", "dist/index.mjs"]