#!/bin/bash

# Exam Tracker Deployment Script
# This script helps deploy the Exam Tracker application to Vercel

set -e

echo "🚀 Starting Exam Tracker deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel first:"
    echo "   vercel login"
    echo "   Then run this script again."
    exit 1
fi

# Check for required files
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the project root."
    exit 1
fi

if [ ! -f "README.md" ]; then
    echo "⚠️  README.md not found. Creating a basic one..."
    cat > README.md << 'EOF'
# Exam Tracker

A comprehensive exam preparation tracker for UPSC and SSC exams.

## Quick Start
1. npm install
2. npm run dev
EOF
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

# Create deployment success message
echo "✅ Deployment successful!"
echo "📊 Your Exam Tracker is now live at the URL provided above."
echo "🎉 Happy studying!"