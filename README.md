# Dr. Cinema - Movie Information App

Dr. Cinema is a comprehensive movie information application built with React Native and Expo. The application provides an intuitive interface for browsing current movies, exploring cinemas, watching trailers, and managing favorite movies. It integrates with the kvikmyndir.is API to display real-time cinema and movie data.

This application was developed and tested for iOS devices.

**Note:** Extras that were implemented are stated at the bottom.

---

## Required Software

**Note:** This app is designed and tested for iOS. The instructions below are for macOS. If you're using Windows or Linux, you can still run the app using the Expo Go app on a physical device, but iOS Simulator will not be available.

### For macOS users:

1. **Node.js** (v14 or newer) - [Download here](https://nodejs.org/)
2. **Xcode** - Install from the Mac App Store (required for iOS Simulator)
3. **Expo CLI** - Install by running:
```bash
   npm install -g expo-cli
```
   
After installing Xcode, open it once and accept the license agreement.

### For Windows/Linux users:

1. **Node.js** (v14 or newer) - [Download here](https://nodejs.org/)
2. **Expo CLI** - Install by running:
```bash
   npm install -g expo-cli
```
3. **Physical iPhone** - You'll need an iPhone with Expo Go installed to test the app (iOS Simulator only works on macOS)

---

## Installation

1. **Clone the repository:**
```bash
   git clone <repository-url>
   cd dr-cinema
```

2. **Install dependencies:**
```bash
   npm install
```
   This downloads all required packages.

3. **Configure API credentials:**
   - Register at http://api.kvikmyndir.is/
   - Update your credentials in the appropriate configuration file

---

## Running the App

### On iOS Simulator (macOS only)

Start the development server and launch the simulator:
```bash
npx expo start --ios
```

Or start the server first and then press `i`:
```bash
npx expo start
# Press 'i' when prompted
```

The first launch could take a few minutes :)

### On a Physical iPhone (Works on any OS)

1. Install "Expo Go" from the App Store on your iPhone
2. Start the development server:
```bash
   npx expo start
```
3. Scan the QR code with your iPhone's Camera app
4. The app will open in Expo Go

*Note: Your computer and iPhone must be on the same Wi-Fi network.*

---

## Features

### Core Functionality

**Home Screen:** Browse all currently showing movies grouped by cinema, with advanced filtering by title, rating, showtime, actors, directors, and PG rating.

**Cinemas:** View alphabetically ordered list of all cinemas with complete contact information and associated movies.

**Movie Details:** Access comprehensive movie information including plot, cast, ratings, showtimes, and in-app trailer playback.

**Upcoming Movies:** Discover upcoming releases with trailers, ordered by release date.

**Favorites:** Save and reorder your favorite movies with persistent storage using AsyncStorage.

**Redux Integration:** Efficient state management with asynchronous action creators and multiple reducers.

### User Experience

**In-app trailer playback:** Watch movie trailers without leaving the application

**Advanced filtering:** Multiple filter options to find exactly what you're looking for

**Intuitive navigation:** Clean interface with seamless transitions between screens

**Persistent favorites:** Your favorite movies are saved and available across sessions

---

## Common Commands
```bash
# Start development server
npx expo start

# Start with cleared cache (fixes most issues)
npx expo start -c

# Open in iOS Simulator
npx expo start --ios

# Install new packages
npm install
```

---

## Troubleshooting

### Simulator won't open
- Make sure Xcode is installed
- Open Xcode → Preferences → Locations
- Set "Command Line Tools" to the latest version

### App won't load on iPhone
- Ensure both devices are on the same Wi-Fi
- Restart the development server
- Try: `npx expo start --tunnel`

### API Connection Issues
- Verify your API credentials are correct
- Check if your authentication token has expired (tokens are valid for 24 hours)
- Ensure you have an active internet connection

---

**Platform:** iOS  
**Designed for:** macOS (but can run on Windows/Linux using physical device)  
**Language:** TypeScript  
**Framework:** React Native with Expo  
**State Management:** Redux  
**API:** kvikmyndir.is

---

## Extra Requirements Implementation

Beyond the core functionality requirements, we implemented **Option 2: User Authentication System** which includes:

### 1. Authentication System
- **Login and Register Screens:** Full authentication flow with form validation
- **Secure Token Storage:** Authentication tokens stored securely
- **Logout Functionality:** Clean session termination

### 2. User Profile Screen
- **User Information Display:** Shows email address, full name, and profile image
- **Edit Profile:** Users can update their information (excluding email address)
- **User Statistics:** View number of favorites and ticket bookings

### 3. Protected Routes
- **Restricted Access:** Favorites feature requires authentication
- **Login Redirect:** Unauthenticated users are redirected to login when accessing protected routes
- **Seamless Experience:** Authenticated users have full access to all features

---