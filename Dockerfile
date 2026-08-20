# ---- Build stage ----
FROM oven/bun:1.1 AS build

WORKDIR /app

# Cache deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build-time env (override with --build-arg)
ARG VITE_SCOPE=prod
ARG VITE_DEV_API_BASE_URL=http://localhost:3001/api
ARG VITE_PROD_API_BASE_URL=https://savy-core.onrender.com/api

ENV VITE_SCOPE=${VITE_SCOPE}
ENV VITE_DEV_API_BASE_URL=${VITE_DEV_API_BASE_URL}
ENV VITE_PROD_API_BASE_URL=${VITE_PROD_API_BASE_URL}

RUN bun run build

# ---- Serve stage ----
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]