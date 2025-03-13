# ===========================
# Base Stage
# ===========================
FROM oven/bun:1.2-alpine AS base

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# ===========================
# Development Stage
# ===========================
FROM base AS development

# Install development dependencies if any (optional)
# RUN bun install --dev

# Copy the rest of the application code
COPY . .

# Expose the development server port
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development

# Start the development server with hot reloading
CMD ["bun", "dev", "--host"]

# ===========================
# Production Stage
# ===========================
FROM base AS production

# Set environment to production
ENV NODE_ENV=production

# Copy the rest of the application code
COPY . .

# Build the SvelteKit application
RUN bun run build

# Remove development dependencies if any (optional)
RUN rm -rf node_modules && bun install --ci

# Expose the production server port
EXPOSE 3000

# Start the production server
CMD ["bun", "./build"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
    CMD curl -f http://localhost:3000/health || exit 1
