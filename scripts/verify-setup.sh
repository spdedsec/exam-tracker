#!/bin/bash

# Exam Tracker Verification Script
# This script verifies the project setup and checks for common issues

set -e

echo "🔍 Verifying Exam Tracker setup..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"

# Check TypeScript
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found"
    exit 1
fi

echo "✅ npx available"

# Check package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

echo "✅ package.json found"

# Check TypeScript configuration
if [ ! -f "tsconfig.json" ]; then
    echo "❌ tsconfig.json not found"
    exit 1
fi

echo "✅ tsconfig.json found"

# Check source directories
DIRECTORIES=("src" "src/app" "src/components" "src/types" "src/utils")

for dir in "${DIRECTORIES[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/ directory found"
    else
        echo "⚠️  $dir/ directory not found"
    fi
done

# Check key files
KEY_FILES=(
    "src/app/layout.tsx"
    "src/app/page.tsx"
    "src/components/dashboard/StatsCards.tsx"
    "src/types/index.ts"
    "src/utils/storage.ts"
    "README.md"
)

for file in "${KEY_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file not found"
        exit 1
    fi
done

# Check package.json dependencies
if grep -q "next" package.json && grep -q "react" package.json && grep -q "typescript" package.json; then
    echo "✅ Required dependencies found in package.json"
else
    echo "⚠️  Some dependencies might be missing in package.json"
fi

# Check for git repository
if [ -d ".git" ]; then
    echo "✅ Git repository found"
else
    echo "ℹ️  Not a git repository (this is normal for a new project)"
fi

echo "✅ Verification completed successfully!"
echo "🎉 Your Exam Tracker project is ready for development!"