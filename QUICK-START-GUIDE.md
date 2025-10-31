🚀 GITHUB SETUP INSTRUCTIONS - COPY & PASTE READY!
================================================================

🎯 STEP 1: CREATE GITHUB REPOSITORY
-----------------------------------

1. Open your web browser and go to: https://github.com/new

2. Fill in the repository details:
   ✅ Repository name: snake-game-android
   ✅ Description: 🐍 Automated Snake Game for Android - Built with React Native
   ✅ Visibility: PUBLIC (required for free GitHub Actions)
   ❌ Do NOT check "Add a README file"
   ❌ Do NOT check "Add .gitignore"
   ❌ Do NOT choose a license

3. Click "Create repository" (green button)

4. Copy your repository URL (it will look like this):
   https://github.com/YOUR_USERNAME/snake-game-android.git

🎯 STEP 2: CONNECT LOCAL CODE TO GITHUB
---------------------------------------

Open PowerShell in the SnakeGame folder and run these commands:

IMPORTANT: Replace YOUR_USERNAME with your actual GitHub username!

```powershell
# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/snake-game-android.git

# Push code to GitHub (this triggers the automatic build!)
git push -u origin master
```

🎯 STEP 3: WATCH THE MAGIC HAPPEN! ✨
------------------------------------

1. Go to your GitHub repository page
2. Click on the "Actions" tab
3. You'll see "🐍 Simple Snake Game APK Builder" running
4. Wait 8-12 minutes for the build to complete
5. Click on the completed build
6. Scroll down to "Artifacts" section
7. Download: "🐍-snake-game-debug-apk" or "🐍-snake-game-release-apk"

🎯 STEP 4: INSTALL ON ANDROID
----------------------------

1. Transfer the APK file to your Android device
2. Go to Settings > Security > Unknown Sources (enable)
3. Tap the APK file to install
4. Open "Snake Game" and play! 🎮

================================================================
🎉 AUTOMATIC BUILDS FOREVER - ZERO ONGOING COST! 
================================================================

Every time you make changes to the code and push to GitHub:
✅ New APK builds automatically
✅ Always get the latest version
✅ Never pay a penny

Ready to proceed? Follow Step 1 first! 🚀