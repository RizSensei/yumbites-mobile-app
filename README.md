# YumBites Mobile App

YumBites is a customer-facing food ordering app built with React Native and Expo. It uses Expo Router for navigation and connects to a REST API for authentication, menu data, offers, cart, and account information.

## Features

- Sign in and create an account
- Browse the home screen, food categories, dishes, and promotions
- View the cart
- View and edit profile details, saved addresses, and password
- View favourites, reviews, order history, and inbox
- Read delivery charge, FAQ, about, privacy, and terms information

The app includes the corresponding screens and API calls; available data and actions depend on the backend.

## Tech stack

- React Native 0.86 and React 19
- Expo SDK 57 and Expo Router
- TanStack Query for server state
- Axios for HTTP requests
- AsyncStorage for authentication data
- React Hook Form and Expo Image Picker

## Requirements

- Node.js compatible with the installed Expo SDK (Node.js 20 LTS is recommended)
- npm
- A reachable YumBites API backend
- For native simulator/device runs: Android Studio or Xcode as appropriate

## Getting started

1. Install dependencies from the project root:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and set the backend base URL:

   ```env
   EXPO_PUBLIC_API_URL=http://localhost:3000
   ```

   The default in the app is `http://localhost:3000`. On Android, the app automatically changes a `localhost` host in this URL to `10.0.2.2` for the Android emulator. For a physical device, use the computer's LAN IP address instead, and make sure the device can reach the backend. Use the URL format expected by your backend, including `https://` where applicable.

3. Start Expo:

   ```bash
   npm start
   ```

   Then choose a target, or start one directly:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

   The iOS command requires macOS and Xcode. Expo Go or a development build may be used depending on the target and installed native modules.

## Configuration and API

`EXPO_PUBLIC_API_URL` is read in [`lib/api.js`](lib/api.js) as the Axios base URL. The app attaches the token stored in AsyncStorage as a Bearer authorization header. Expo public environment variables are included in the client app, so do not put secrets in them.

The client calls these backend routes:

| Area | Routes used by the app |
| --- | --- |
| Authentication | `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, `/api/auth/refresh` |
| Profile | `/api/profile/me`, `/api/profile/update-profile`, `/api/profile/change-password`, `/api/profile/get-favourite-dishes` |
| Categories and dishes | `/api/categories`, `/api/dishes` |
| Offers | `/api/promos` |
| Cart | `/api/cart` and `/api/cart/:id` |
| Orders | `/api/orders` and `/api/orders/my-orders` |

The API service also defines calls for users, invoices, dashboard data, and restaurant details. The backend must provide compatible routes and response data for any screens that use them.

## Project structure

```text
app/         Expo Router screens and route layouts
components/  Shared UI and screen sections
constants/   Shared constants and theme colors
contexts/    Authentication context
hooks/       React Query hooks
lib/         Axios client and API endpoint configuration
providers/   React Query provider
services/    Backend API functions
styles/      Screen and component styles
assets/      App icons and splash assets
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Start Expo and open Android |
| `npm run ios` | Start Expo and open iOS |
| `npm run web` | Start the web target |

## Notes

- Keep `.env` local; it is ignored by Git. Configure `EXPO_PUBLIC_API_URL` separately for each development environment.
- If API requests fail, confirm the backend is running, the base URL is reachable from the selected device or simulator, and the backend allows requests from the web origin when using web.
- There is no test, lint, or build script currently defined in `package.json`.
- No license file is currently included.
