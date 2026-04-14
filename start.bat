@echo off
REM A Craving - Quick Start Script for Windows
REM This script helps you get the app running locally

echo 🍽️  A Craving - Quick Start Setup
echo ==================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo ⚠️  .env.local not found. Creating from example...
    copy .env.local.example .env.local
    echo ✅ .env.local created (please update with your settings)
    echo.
)

REM Start development server
echo 🚀 Starting development server...
echo 📍 Open http://localhost:3000 in your browser
echo.
call npm run dev
pause
