# YumBites Mobile App

YumBites is a React Native / Expo mobile app for a restaurant and food-ordering experience. It provides a polished customer-facing interface for browsing meals, viewing offers, managing a cart, placing orders, and updating account settings.

## Overview

This app is structured around Expo Router and includes screens for:

- Authentication (login and registration)
- Home dashboard with hero banners, categories, and popular items
- Menu browsing and cart management
- Favourites and reviews
- Order history and tracking
- Profile and account settings
- Delivery details, privacy policy, terms, FAQs, and about pages

## Tech Stack

- React Native
- Expo
- Expo Router
- React Query
- Axios
- AsyncStorage
- React Hook Form
- Expo Image / Image Picker
- Lucide icons and custom themed UI components

## Project Structure

```text
.
├── app/                  # Expo Router pages and route groups
├── components/          # Reusable UI components and page sections
├── constants/           # App-wide constants and shared values
├── contexts/            # Context providers
├── hooks/               # Custom hooks
├── lib/                 # Shared libraries and API configuration
├── providers/           # App providers
├── services/            # API service definitions
├── styles/              # Shared style files
├── assets/              # App assets and branding files
├── .env                 # Environment variables
├── app.json             # Expo configuration
├── package.json         # Scripts and dependencies
├── README.md            # Project documentation
└── ...
```

## Features

- Responsive mobile-first UI for Android, iOS, and web
- Login and registration flows for users
- Home feed with cuisine categories and promotions
- Popular dishes and featured content sections
- Cart and checkout-related flows
- Profile management and order history
- Settings area with password updates and address management
- Policy and support pages for legal and general information

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ or 20 LTS recommended
- npm or yarn
- Expo CLI (optional, but commonly installed with the project dependencies)
- Android Studio or Xcode for device/simulator testing
- A running backend API compatible with the app's `/api/*` endpoints

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd yumbites-mobile-app
```

2. Install dependencies:

```bash
npm install
```

3. Create or update the environment file in the project root:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.10:3001
```

Notes:

- Replace the URL with your backend host.
- If you are using an Android emulator, use `10.0.2.2` instead of `localhost` when pointing to a local backend.
- Example:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3001
```

## Running the Application

Start the Expo development server:

```bash
npm start
```

Then run one of the following:

```bash
npm run android
```

```bash
npm run ios
```

```bash
npm run web
```

## Environment Configuration

The app reads its API base URL from the `EXPO_PUBLIC_API_URL` environment variable defined in `.env`.

This is used by the shared Axios instance in `lib/api.js` to communicate with the backend. If your backend is not running or the URL is incorrect, the app will not be able to fetch data for auth, menu, profile, and order-related actions.

## API Expectations

This application expects a backend that exposes endpoints such as:

- `/api/auth/login`
- `/api/auth/register`
- `/api/profile/*`
- `/api/cart`
- `/api/orders`
- `/api/dishes`
- `/api/categories`
- `/api/promos`
- `/api/dashboard`

## Scripts

The project currently includes these scripts:

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
}
```

## Notes

- The app is designed for a restaurant ordering workflow and assumes a connected backend service.
- Some screens and data flows are not fully static and depend on the API responses from the backend.
- For local development, ensure your machine and simulator/device can reach the configured backend URL.

## License

This project does not currently include a license file. If you plan to distribute or publish the app, add a license before release.

## Contributing

Contributions are welcome. Please open an issue or create a branch with your changes before submitting a pull request.
