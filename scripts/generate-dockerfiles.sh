#!/bin/bash
# Script to generate Dockerfiles for services that are missing them

set -e

BASE_DIR="/workspace/mycodexvantaos"
SERVICES_DIR="$BASE_DIR/services"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}Dockerfile Generator for MyCodeXvantaOS${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo ""

# Counters
total_created=0
total_skipped=0

# Services that need Dockerfiles
services_needing_dockerfile=(
    "mycodexvantaos-ai-ensemble"
    "mycodexvantaos-ai-team-service"
    "mycodexvantaos-app-dev-studio"
    "mycodexvantaos-app-validation"
    "mycodexvantaos-launch-pad"
    "mycodexvantaos-platform-validation"
    "mycodexvantaos-studio-platform"
)

for service_name in "${services_needing_dockerfile[@]}"; do
    service_dir="$SERVICES_DIR/$service_name"
    
    if [ ! -d "$service_dir" ]; then
        echo -e "${RED}✗${NC} Service directory not found: $service_dir"
        continue
    fi
    
    echo -e "${YELLOW}Processing: $service_name${NC}"
    
    # Check if Dockerfile already exists
    if [ -f "$service_dir/Dockerfile" ]; then
        echo -e "  ${GREEN}✓${NC} Dockerfile already exists, skipping..."
        total_skipped=$((total_skipped + 1))
        continue
    fi
    
    # Determine node version based on service type
    node_version="20.11.1"
    
    # Create Dockerfile
    cat > "$service_dir/Dockerfile" << EOF
# Dockerfile for $service_name
# Multi-stage build for optimized production image

# Stage 1: Build
FROM node:${node_version}-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY . .

# Build application (if applicable)
RUN if [ -f "tsconfig.json" ]; then \
        npm install -g typescript && \
        npm run build; \
    fi

# Stage 2: Production
FROM node:${node_version}-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built artifacts from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist 2>/dev/null || true
COPY --from=builder --chown=nodejs:nodejs /app/src ./src 2>/dev/null || true

# Copy config directory
COPY --chown=nodejs:nodejs config ./config 2>/dev/null || true

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/index.js"]
EOF

    echo -e "  ${GREEN}✓${NC} Created: $service_dir/Dockerfile"
    total_created=$((total_created + 1))
    echo ""
done

# Summary
echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo -e "Dockerfiles created: ${GREEN}$total_created${NC}"
echo -e "Dockerfiles skipped (already exists): ${YELLOW}$total_skipped${NC}"
echo -e "${BLUE}==================================================================${NC}"

if [ $total_created -eq 0 ]; then
    echo -e "${YELLOW}All services already have Dockerfiles!${NC}"
    exit 0
fi

echo -e "${GREEN}Dockerfile generation completed successfully!${NC}"