# OpenMusic API v1 - Development Commands
# PowerShell script untuk development commands

# Setup commands
function Setup-OpenMusic {
    Write-Host "🚀 Setting up OpenMusic API v1..." -ForegroundColor Green
    npm install
    npm run migrate up
    npm run lint
    Write-Host "✅ Setup completed!" -ForegroundColor Green
}

# Start server commands
function Start-OpenMusic {
    Write-Host "🚀 Starting OpenMusic API server..." -ForegroundColor Green
    npm start
}

function Start-OpenMusicDev {
    Write-Host "🚀 Starting OpenMusic API server (development mode)..." -ForegroundColor Green
    npm run start-dev
}

# Migration commands
function Run-Migration {
    Write-Host "🔄 Running migrations..." -ForegroundColor Yellow
    npm run migrate up
}

function Rollback-Migration {
    Write-Host "⏪ Rolling back migrations..." -ForegroundColor Yellow
    npm run migrate down
}

function Reset-Database {
    Write-Host "🗑️ Resetting database..." -ForegroundColor Red
    npm run migrate down
    npm run migrate up
    Write-Host "✅ Database reset completed!" -ForegroundColor Green
}

# Code quality commands
function Check-CodeQuality {
    Write-Host "🔍 Checking code quality..." -ForegroundColor Cyan
    npm run lint
}

function Fix-CodeQuality {
    Write-Host "🔧 Fixing code quality issues..." -ForegroundColor Cyan
    npm run lint:fix
}

# Test API commands
function Test-AlbumAPI {
    Write-Host "🧪 Testing Album API..." -ForegroundColor Magenta
    $albumData = '{"name":"Test Album","year":2025}'
    $response = Invoke-RestMethod -Uri "http://localhost:5000/albums" -Method POST -ContentType "application/json" -Body $albumData
    $response | ConvertTo-Json -Depth 3
}

function Test-SongAPI {
    param([string]$albumId)
    Write-Host "🧪 Testing Song API..." -ForegroundColor Magenta
    $songData = @{
        title = "Test Song"
        year = 2025
        genre = "Pop"
        performer = "Test Artist"
        duration = 180
        albumId = $albumId
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:5000/songs" -Method POST -ContentType "application/json" -Body $songData
    $response | ConvertTo-Json -Depth 3
}

function Get-AllSongs {
    Write-Host "📋 Getting all songs..." -ForegroundColor Magenta
    $response = Invoke-RestMethod -Uri "http://localhost:5000/songs" -Method GET
    $response | ConvertTo-Json -Depth 3
}

# Help function
function Show-OpenMusicHelp {
    Write-Host @"
🎵 OpenMusic API v1 - Development Commands

Setup Commands:
  Setup-OpenMusic          - Complete setup (install, migrate, lint)

Server Commands:
  Start-OpenMusic          - Start server (production mode)
  Start-OpenMusicDev       - Start server (development mode)

Migration Commands:
  Run-Migration           - Run database migrations
  Rollback-Migration      - Rollback database migrations
  Reset-Database          - Reset database (down then up)

Code Quality Commands:
  Check-CodeQuality       - Run ESLint checks
  Fix-CodeQuality         - Fix ESLint issues automatically

Test Commands:
  Test-AlbumAPI           - Test album creation
  Test-SongAPI -albumId "album-id" - Test song creation
  Get-AllSongs            - Get all songs

Usage Examples:
  Setup-OpenMusic
  Start-OpenMusicDev
  Test-AlbumAPI
  Test-SongAPI -albumId "album-123"

"@ -ForegroundColor White
}

# Export functions
Export-ModuleMember -Function *

Write-Host "OpenMusic API v1 PowerShell module loaded!" -ForegroundColor Green
Write-Host "Type 'Show-OpenMusicHelp' for available commands." -ForegroundColor Yellow
