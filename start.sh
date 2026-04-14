#!/bin/bash
# A Craving - Quick Start Script
# This script helps you get the app running locally

echo "🍽️  A Craving - Quick Start Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
mongosh --eval "db.adminCommand('ping')" &> /dev/null

if [ $? -eq 0 ]; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running locally. Make sure to:"
    echo "   - Start MongoDB locally, OR"
    echo "   - Set MONGODB_URI to MongoDB Atlas connection string in .env.local"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    cp .env.local.example .env.local
    echo "✅ .env.local created (please update with your settings)"
    echo ""
fi

# Build the app
echo "🔨 Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build successful"
echo ""

# Start development server
echo "🚀 Starting development server..."
echo "📍 Open http://localhost:3000 in your browser"
echo ""
npm run dev
