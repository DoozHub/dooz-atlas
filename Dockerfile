# Dooz Atlas - Documentation Viewer
FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY viewer/package.json viewer/bun.lock ./viewer/
RUN cd viewer && bun install --frozen-lockfile

# Build viewer
FROM base AS build
COPY --from=deps /app/viewer/node_modules ./viewer/node_modules
COPY . .
RUN cd viewer && bun run build

# Production
FROM node:20-alpine AS production
WORKDIR /app

RUN npm install -g serve

# Copy built viewer and documentation
COPY --from=build /app/viewer/dist ./dist
COPY --from=build /app/0*_* ./docs/
COPY --from=build /app/1*_* ./docs/

ENV PORT=5174
EXPOSE 5174

CMD ["serve", "-s", "dist", "-l", "5174"]
