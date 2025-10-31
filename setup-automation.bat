@echo off
echo.
echo ============================================
echo    🐍 SNAKE GAME - AUTO APK BUILDER 🤖
echo ============================================
echo.
echo This will help you set up FULLY AUTOMATED APK building!
echo.
echo Prerequisites:
echo ✅ Git installed (https://git-scm.com/download/win)
echo ✅ GitHub account (free at github.com)
echo.
pause

echo.
echo Step 1: Creating GitHub repository...
echo 👉 Go to: https://github.com/new
echo 👉 Repository name: snake-game-android
echo 👉 Make it PUBLIC (for free GitHub Actions)
echo 👉 Don't initialize with README
echo 👉 Click "Create Repository"
echo.
pause

echo.
echo Step 2: Initializing local repository...
git init
if %errorlevel% neq 0 (
    echo ❌ Git not found! Please install Git first.
    echo 📥 Download: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo Step 3: Adding files...
git add .

echo.
echo Step 4: Creating first commit...
git commit -m "🐍 Initial Snake Game - Auto APK Builder Ready!"

echo.
echo ============================================
echo    🎯 FINAL STEPS (Manual):
echo ============================================
echo.
echo 1. Copy your GitHub repository URL
echo 2. Run this command (replace YOUR_USERNAME):
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/snake-game-android.git
echo    git push -u origin main
echo.
echo 3. Go to your GitHub repository
echo 4. Click "Actions" tab
echo 5. Watch your APK build automatically! 🤖
echo.
echo ⏰ Build time: 8-12 minutes
echo 📥 Download APK from "Artifacts" section
echo.
echo ============================================
echo    🎮 ENJOY YOUR AUTOMATED SNAKE GAME! 🐍
echo ============================================
pause