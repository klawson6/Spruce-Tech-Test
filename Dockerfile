# Base image with non-root user
FROM node:24.13-alpine3.23 AS base

WORKDIR /app

RUN addgroup -g 1001 -S runner && \
    adduser -S runner -u 1001 -h /home/runner -G runner && \
    chown -R runner:runner /app/

# Image with only dependencies for runtime
FROM base AS app-deps

COPY --parents package.json package-lock.json ./client/package.json ./client/package-lock.json ./server/package.json ./server/package-lock.json /app/

RUN --mount=type=cache,target=/home/runner/.npm,sharing=locked \
    npm ci --ignore-scripts --prefix client
RUN --mount=type=cache,target=/home/runner/.npm,sharing=locked \
    npm ci --ignore-scripts --prefix server --omit=dev

# Image with all dependencies for tests etc
FROM base AS build-deps

COPY --parents package.json package-lock.json ./client/package.json ./client/package-lock.json ./server/package.json ./server/package-lock.json /app/

RUN --mount=type=cache,target=/home/runner/.npm,sharing=locked \
    npm ci --ignore-scripts --prefix client
RUN --mount=type=cache,target=/home/runner/.npm,sharing=locked \
    npm ci --ignore-scripts --prefix server

# Image with fully built app
FROM build-deps AS build

COPY . .

RUN npm run build

# Runnable image of our app
FROM base AS app

COPY --from=app-deps /app/server/node_modules ./node_modules
COPY --from=build /app/server/dist ./dist
COPY --from=build /app/server/public ./public
COPY --from=build /app/server/prisma ./prisma
COPY --from=build /app/server/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/server/package.json ./package.json

EXPOSE 8080

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.mjs"]