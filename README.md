# Video Diary App

A React Native app built with Expo for creating and managing video diaries. Select videos, crop 5-second clips, and add metadata.

## Features

- Video selection from media library
- 5-second video cropping
- Metadata management (name, description)
- Local storage with AsyncStorage
- Modern dark UI with animations

## Tech Stack

- Expo (~54.0.24)
- React Native (0.81.5)
- Expo Router
- Zustand (state management)
- NativeWind (Tailwind CSS)
- expo-video, expo-trim-video
- React Query, Zod

## Getting Started

## Requirements

- Node.js version **20 or higher** is required.

**Important:** This app requires a native build. The `expo-trim-video` module ([GitHub](https://github.com/yemirhan/expo-trim-video)) is a native Expo module that only works on iOS and Android. It does **not** work with:

- ❌ Expo Go
- ❌ Web

You must build and run the app natively using `npm run ios` or `npm run android`.

```bash
# Install dependencies
npm install

# iOS dependencies
cd ios && pod install && cd ..

# Run on iOS (requires Xcode)
npm run ios

# Run on Android (requires Android Studio)
npm run android
```

## Scripts

- `npm run ios` - Build and run on iOS simulator/device
- `npm run android` - Build and run on Android emulator/device
- `npm start` - Start Expo dev server (for development)
