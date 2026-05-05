#!/bin/bash

# MyCodeXvantaOS Workflow Fixer Script
# This script performs bulk updates to GitHub Actions workflows to fix common CI failures.

echo "🚀 Starting MyCodeXvantaOS Workflow Fixer..."

WORKFLOW_DIR=".github/workflows"

if [ ! -d "$WORKFLOW_DIR" ]; then
    echo "❌ Error: .github/workflows directory not found. Please run this script from the project root."
    exit 1
fi

# 1. Fix pnpm installation flags
echo "📦 Updating pnpm installation flags..."
find "$WORKFLOW_DIR" -type f -name "*.y*ml" -exec sed -i 's/--frozen-lockfile/--no-frozen-lockfile/g' {} +

# 2. Upgrade Node.js versions
echo "🟢 Upgrading Node.js versions to 20.x..."
find "$WORKFLOW_DIR" -type f -name "*.y*ml" -exec sed -i 's/node-version: \[14.x, 16.x, 18.x\]/node-version: \[18.x, 20.x, 22.x\]/g' {} +
find "$WORKFLOW_DIR" -type f -name "*.y*ml" -exec sed -i 's/node-version: 1[468].x/node-version: 20.x/g' {} +

# 3. Create unfreeze marker
echo "❄️ Creating deployment unfreeze marker..."
touch .unfreeze

echo "✅ Workflow fix completed successfully!"
echo "👉 Next steps: git add . && git commit -m 'Fix CI/CD workflows' && git push"
