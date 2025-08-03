@echo off
REM OpenMusic API v1 - Setup Script for Windows
REM Script untuk setup otomatis OpenMusic API v1 di Windows

echo 🚀 Starting OpenMusic API v1 Setup...
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm not found. Please install Node.js first.
    pause
    exit /b 1
)

echo 📦 Step 1: Installing dependencies...
npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

echo 🗄️  Step 2: Setting up database...
echo    Please make sure PostgreSQL is running and database 'openmusic' exists
echo    If not, create it with: CREATE DATABASE openmusic;
echo.

pause

echo 🔄 Step 3: Running database migrations...
npm run migrate up

if errorlevel 1 (
    echo ❌ Migration failed. Please check database connection.
    pause
    exit /b 1
)

echo ✅ Database migrations completed
echo.

echo 🔍 Step 4: Checking code quality...
npm run lint

if errorlevel 1 (
    echo ⚠️  ESLint found some issues. You can fix them with: npm run lint:fix
) else (
    echo ✅ Code quality check passed
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo To start the server:
echo    npm start           (production mode)
echo    npm run start-dev   (development mode)
echo.
echo API will be available at: http://localhost:5000
echo.

pause
