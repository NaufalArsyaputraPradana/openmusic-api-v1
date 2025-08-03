#!/bin/bash

# OpenMusic API v1 - Setup Script
# Script untuk setup otomatis OpenMusic API v1

echo "🚀 Starting OpenMusic API v1 Setup..."
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Please install PostgreSQL first."
    echo "   You can skip this if PostgreSQL is installed but not in PATH."
    echo ""
fi

echo "📦 Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

echo "🗄️  Step 2: Setting up database..."
echo "   Please make sure PostgreSQL is running and database 'openmusic' exists"
echo "   If not, create it with: CREATE DATABASE openmusic;"
echo ""

read -p "   Press Enter to continue after database is ready..."

echo "🔄 Step 3: Running database migrations..."
npm run migrate up

if [ $? -ne 0 ]; then
    echo "❌ Migration failed. Please check database connection."
    exit 1
fi

echo "✅ Database migrations completed"
echo ""

echo "🔍 Step 4: Checking code quality..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  ESLint found some issues. You can fix them with: npm run lint:fix"
else
    echo "✅ Code quality check passed"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the server:"
echo "   npm start           (production mode)"
echo "   npm run start-dev   (development mode)"
echo ""
echo "API will be available at: http://localhost:5000"
echo ""
