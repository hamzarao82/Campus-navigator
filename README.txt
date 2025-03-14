CAMPUS NAVIGATOR
================
A comprehensive indoor navigation system for university campuses with real-time tracking, POI management, and role-based access control.

Features
--------
1. Authentication
   - User login/signup
   - Password recovery
   - Role-based access (Student/Faculty/Admin)
   - Firebase authentication

2. Navigation
   - Indoor positioning using IndoorAtlas
   - Real-time location tracking
   - Points of Interest (POI) display
   - Floor-level navigation
   - Search functionality
   - Offline map support

3. Admin Dashboard
   - User management
   - POI management
   - Map updates
   - Permission control
   - Analytics dashboard

4. Additional Features
   - Offline mode
   - Real-time updates
   - Cross-platform support
   - Search history
   - Custom markers

Prerequisites
------------
- Node.js 18+
- npm or yarn
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)
- Firebase account
- IndoorAtlas API key

Setup Instructions
----------------
1. Clone the repository:
   git clone [repository-url]

2. Install dependencies:
   npm install
   cd backend && npm install

3. Environment Setup:
   - Copy .env.example to .env
   - Update Firebase and IndoorAtlas credentials
   - Configure backend URL

4. Backend Setup:
   cd backend
   npm run setup-db
   npm start

Android Emulator Setup
--------------------
1. Install Android Studio
   - Download from https://developer.android.com/studio
   - Complete the installation process

2. Configure Android Studio:
   - Open Android Studio
   - Go to Tools > SDK Manager
   - Install Android SDK Platform 33 (or latest)
   - Install Intel HAXM (for better performance)
   - Install Android SDK Build-Tools

3. Create Virtual Device:
   - Go to Tools > Device Manager
   - Click "Create Device"
   - Select "Pixel 6" (or any modern device)
   - Choose "API 33" system image
   - Complete the setup wizard

4. Start the Emulator:
   - In Device Manager, click the play button next to your virtual device
   - Wait for the emulator to fully boot

5. Run the App:
   - Open terminal in project root
   - Run: npm install
   - Run: npx expo start --android
   - The app should launch in the emulator

iOS Simulator Setup (macOS only)
------------------------------
1. Install Xcode:
   - Download from Mac App Store
   - Complete the installation
   - Open Xcode and accept any additional installations

2. Install iOS Simulator:
   - Open Xcode
   - Go to Preferences > Components
   - Download a simulator runtime (iOS 16 or latest)

3. Configure Xcode Command Line Tools:
   - Open terminal
   - Run: xcode-select --install
   - Follow the installation prompts

4. Run the App:
   - Open terminal in project root
   - Run: npm install
   - Run: npx expo start --ios
   - The app should launch in the simulator

Troubleshooting
--------------
Android Issues:
- Error "JAVA_HOME not set":
  - Set JAVA_HOME environment variable
  - Install JDK if not present

- Gradle build fails:
  - Run: cd android && ./gradlew clean
  - Try rebuilding project

- AVD Manager not showing:
  - Reinstall Android Studio
  - Check SDK installation

iOS Issues:
- Xcode build fails:
  - Update Xcode to latest version
  - Run: npm install
  - Clear build folder: rm -rf ios/build

- Simulator not starting:
  - Reset simulator: xcrun simctl erase all
  - Reinstall simulator runtime

Common Issues:
- Metro bundler stuck:
  - Clear cache: npm start -- --reset-cache
  - Kill Metro and restart

- Dependencies issues:
  - Clear npm cache: npm cache clean --force
  - Delete node_modules and reinstall

Support
-------
For issues and feature requests, please create an issue in the repository.

License
-------
[License Type] - See LICENSE file for details
