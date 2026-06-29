# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Build the static site
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine AS runtime

# SPA-friendly nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Basic healthcheck against the served index.
# Use 127.0.0.1 (not localhost) so the probe hits IPv4, which nginx listens on.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
