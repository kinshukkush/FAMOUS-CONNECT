# Famous Connect 🚀

> A modern React Native mobile application connecting users with local service providers

![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Famous Connect is a premium mobile marketplace that seamlessly connects users with local service providers including plumbers, electricians, cleaners, painters, and movers. Built with React Native, Expo, and TypeScript, it delivers a modern, performant experience across iOS and Android platforms.

---

## 📱 Features

### 🔐 Authentication & User Management
- **Secure Authentication** with Supabase (email/password)
- **Persistent Sessions** across app restarts
- **User Profile** with stats and settings
- **Password Recovery** flow

### 🛍️ Service Discovery
- **Browse Services** by categories
- **Real-time Search** with debouncing
- **Category Filtering** for quick access
- **Pagination** with infinite scroll
- **Pull-to-Refresh** for latest updates

### ⭐ Favorites System
- **Save Services** for quick access
- **Persistent Storage** with AsyncStorage
- **Toggle Favorites** from any screen
- **Favorites Screen** with management

### 📝 Service Details
- **Comprehensive Information** (price, rating, description)
- **Image Gallery** with swipeable photos
- **Contact Options** (call, chat)
- **Book Now** functionality
- **Share Services** with others

### 💬 Real-time Chat
- **Instant Messaging** with service providers
- **Real-time Updates** using Supabase subscriptions
- **Message History** persistence
- **Typing Indicators** and online status

### 🎨 UI/UX Excellence
- **Dark Mode** with system preference detection
- **Smooth Animations** and transitions
- **Custom Icons** from Lucide React Native
- **Responsive Design** for all screen sizes
- **Professional Theme System** with consistent styling

---

## 🛠️ Tech Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.81.5 | Cross-platform mobile framework |
| Expo | ~54.0.32 | Development platform & tooling |
| TypeScript | ~5.9.2 | Type safety and better DX |
| Node.js | ≥18.0.0 | Runtime environment |

### Navigation
| Library | Version | Purpose |
|---------|---------|---------|
| @react-navigation/native | ^7.1.28 | Navigation framework |
| @react-navigation/native-stack | ^7.11.0 | Native stack navigator |
| @react-navigation/bottom-tabs | ^7.10.1 | Bottom tab navigation |
| react-native-screens | ~4.16.0 | Native screen optimization |
| react-native-gesture-handler | ~2.28.0 | Gesture handling |

### State Management & API
| Library | Version | Purpose |
|---------|---------|---------|
| @tanstack/react-query | ^5.90.20 | Server state management |
| @supabase/supabase-js | ^2.93.1 | Backend & authentication |
| axios | ^1.13.3 | HTTP client |
| formik | ^2.4.9 | Form management |
| yup | ^1.7.1 | Schema validation |

### Storage & Utilities
| Library | Version | Purpose |
|---------|---------|---------|
| @react-native-async-storage/async-storage | 2.2.0 | Local persistence |
| react-native-get-random-values | ~1.11.0 | Crypto polyfill |
| react-native-url-polyfill | ^3.0.0 | URL API polyfill |
| lucide-react-native | ^0.563.0 | Icon library |

---

## 📂 Project Structure

```
famous-connect/
├── App.tsx                      # Root component with providers
├── index.ts                     # App entry point
├── app.json                     # Expo configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
├── .env                         # Environment variables
│
├── assets/                      # Static assets (images, icons)
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
│
└── src/
    ├── api/                     # API clients & services
    │   ├── supabase.ts         # Supabase client setup
    │   └── services.ts         # API service methods
    │
    ├── components/              # Reusable UI components
    │   ├── common/             # Generic components
    │   │   ├── Input.tsx       # Text input with validation
    │   │   └── PrimaryButton.tsx # Customizable button
    │   └── services/           # Service-specific components
    │       └── ServiceCard.tsx  # Service listing card
    │
    ├── hooks/                   # Custom React hooks
    │   └── useAuth.tsx         # Authentication context & hook
    │
    ├── navigation/              # Navigation configuration
    │   ├── RootNavigator.tsx   # Root navigation switcher
    │   ├── AuthNavigator.tsx   # Authentication flow stack
    │   ├── MainNavigator.tsx   # Main app stack
    │   └── TabNavigator.tsx    # Bottom tab navigator
    │
    ├── screens/                 # Screen components
    │   ├── auth/               # Authentication screens
    │   │   ├── LoginScreen.tsx
    │   │   ├── SignupScreen.tsx
    │   │   └── ForgotPasswordScreen.tsx
    │   └── main/               # Main app screens
    │       ├── HomeScreen.tsx
    │       ├── ServicesScreen.tsx
    │       ├── ServiceDetailsScreen.tsx
    │       ├── SearchScreen.tsx
    │       ├── FavoritesScreen.tsx
    │       ├── ProfileScreen.tsx
    │       └── ChatScreen.tsx
    │
    ├── storage/                 # Local storage services
    │   └── favorites.ts        # Favorites persistence
    │
    ├── theme/                   # Theme system
    │   └── index.ts            # Colors, typography, spacing
    │
    ├── types/                   # TypeScript definitions
    │   └── index.ts            # Shared interfaces & types
    │
    └── utils/                   # Utility functions
        └── (future utilities)
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo Go** app on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **Git** - [Download](https://git-scm.com/)

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/famous-connect.git
cd famous-connect
```

#### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native and Expo dependencies
- Navigation libraries
- Supabase client
- Form management tools
- UI icon library

#### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**To get your Supabase credentials:**

1. Go to [Supabase](https://supabase.com/) and create a free account
2. Create a new project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public** key
5. Paste them into your `.env` file

**Note:** The app includes mock authentication for development if Supabase is not configured.

#### Step 4: Start the Development Server

```bash
npm start
```

Or use specific platform commands:

```bash
# Start for Android
npm run android

# Start for iOS
npm run ios

# Start for Web
npm run web
```

#### Step 5: Open in Expo Go

1. Ensure your computer and mobile device are on the **same Wi-Fi network**
2. Open the **Expo Go** app on your device
3. Scan the QR code displayed in the terminal or browser

---

## 📖 Usage Guide

### Authentication Flow

#### 1. Sign Up
- Launch the app
- Tap **"Sign Up"** on the login screen
- Enter your name, email, and password
- Confirm password
- Tap **"Sign Up"**
- Check your email for verification (if Supabase is configured)

#### 2. Log In
- Enter your registered email and password
- Tap **"Login"**
- You'll be redirected to the home screen

#### 3. Forgot Password
- Tap **"Forgot Password?"** on login screen
- Enter your email address
- Check your email for reset instructions

### Browsing Services

#### Home Screen
- View **trending services** in your area
- Browse **service categories** (Plumbing, Cleaning, etc.)
- Tap category cards to filter services
- Use the search bar for specific services

#### Services Screen
- View all available services
- Filter by category using chips at the top
- Scroll to load more services (pagination)
- Pull down to refresh the list

#### Search
- Tap the search icon
- Enter search keywords
- Results appear as you type (debounced)
- Tap any service to view details

### Service Details

- View comprehensive service information
- Swipe through service image gallery
- Check pricing and ratings
- Read detailed descriptions
- **Add to Favorites** - Heart icon in top right
- **Share Service** - Share icon
- **Call Provider** - Tap call button
- **Chat with Provider** - Tap chat button
- **Book Now** - Bottom button to book the service

### Managing Favorites

- **Add Favorite**: Tap heart icon on any service card
- **View Favorites**: Go to Favorites tab
- **Remove Favorite**: Tap heart icon again
- Favorites are stored locally and persist across sessions

### Chat with Providers

- Open a service detail page
- Tap **"Chat"** button
- Type your message in the input field
- Tap send icon
- Messages appear in real-time (if Supabase is configured)
- Online status indicator shows provider availability

### Profile Management

- View your **booking statistics**
- See **favorites count** and **rating**
- **Edit Profile** - Update name and picture
- **Notifications** - Manage notification preferences
- **Settings** - App preferences
- **Logout** - Sign out of your account

---

## 🏗️ Architecture & Design Patterns

### Component Architecture

**Atomic Design Principles:**
- **Atoms**: Input, Button (common components)
- **Molecules**: ServiceCard (composed components)
- **Organisms**: HomeScreen sections, ServiceDetails
- **Templates**: Screen layouts with navigation
- **Pages**: Complete screens with business logic

### State Management

**Three-Tier Approach:**

1. **Server State** (TanStack Query)
   - API data caching
   - Background refetching
   - Automatic invalidation
   - Loading/error states

2. **Global State** (Context API)
   - Authentication state (useAuth)
   - User information
   - Theme preferences

3. **Local State** (useState/useReducer)
   - Component-specific state
   - Form inputs
   - UI toggles

### Navigation Pattern

```
Conditional Root
    ├── Not Authenticated → Auth Stack
    │       ├── Login
    │       ├── Signup
    │       └── Forgot Password
    │
    └── Authenticated → Main Stack
            ├── Home Tabs (Bottom Navigator)
            │       ├── Home
            │       ├── Services
            │       ├── Favorites
            │       └── Profile
            ├── Service Details (Modal)
            ├── Search (Full Screen)
            └── Chat (Full Screen)
```

### Data Flow

1. **API Request** → Axios client
2. **Response** → TanStack Query cache
3. **State Update** → React component
4. **UI Render** → Themed components

---

## 🎨 Theming System

### Theme Structure

```typescript
// Color Palette
Primary: #6366f1 (Indigo)
Secondary: #10b981 (Green)
Accent: #f59e0b (Amber)
Error: #ef4444 (Red)

// Light Theme
Background: #f8fafc
Surface: #ffffff
Text Primary: #0f172a

// Dark Theme
Background: #0f172a
Surface: #1e293b
Text Primary: #f8fafc
```

### Typography Scale

```typescript
H1: 32px / Bold / 40px line height
H2: 24px / Bold / 32px line height
H3: 20px / Semibold / 28px line height
Body: 16px / Regular / 24px line height
Caption: 14px / Regular / 20px line height
```

### Spacing System

```typescript
XS: 4px    // Minimal spacing
SM: 8px    // Small spacing
MD: 16px   // Standard spacing
LG: 24px   // Large spacing
XL: 32px   // Extra large
XXL: 48px  // Maximum spacing
```

---

## 🔧 Configuration

### Expo Configuration (app.json)

```json
{
  "expo": {
    "name": "famous-connect",
    "slug": "famous-connect",
    "version": "1.0.0",
    "orientation": "portrait",
    "newArchEnabled": true,
    "android": {
      "edgeToEdgeEnabled": true,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png"
      }
    },
    "ios": {
      "supportsTablet": true
    }
  }
}
```

### TypeScript Configuration

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

---

## 🧪 Testing (Future Implementation)

### Recommended Testing Stack

```bash
# Unit Testing
npm install --save-dev jest @testing-library/react-native

# E2E Testing
npm install --save-dev detox

# Type Checking
npm run type-check
```

---

## 📱 Building for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS IPA

```bash
# Build for iOS
eas build --platform ios --profile preview
```

---

## 🚀 Deployment

### Over-the-Air (OTA) Updates

```bash
# Publish update
eas update --branch production --message "Bug fixes"
```

### App Store Submission

1. Build production version: `eas build --platform ios --profile production`
2. Download IPA file
3. Upload to App Store Connect
4. Submit for review

### Google Play Store

1. Build production APK/AAB: `eas build --platform android --profile production`
2. Download AAB file
3. Upload to Google Play Console
4. Submit for review

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Metro Bundler Port Conflict

```bash
# Kill existing processes
npx react-native start --reset-cache
```

#### 2. Expo Go Connection Issues

- Ensure both devices are on the same network
- Check firewall settings
- Try restarting the Expo server

#### 3. TypeScript Errors

```bash
# Clear TypeScript cache
npm run type-check

# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

#### 4. Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project status
- Ensure anon key has proper permissions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add comments for complex logic
- Ensure no TypeScript errors

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Supabase](https://supabase.com/) for backend services
- [React Navigation](https://reactnavigation.org/) for navigation
- [TanStack Query](https://tanstack.com/query) for state management
- [Lucide](https://lucide.dev/) for beautiful icons
- [DummyJSON](https://dummyjson.com/) for API data

---

## 📞 Support

For support, email support@famousconnect.com or join our Slack channel.

---

## 🗺️ Roadmap

### Version 1.1 (Q2 2026)
- [ ] Push notifications
- [ ] In-app payments
- [ ] Service provider dashboard
- [ ] Booking calendar
- [ ] Review and rating system

### Version 1.2 (Q3 2026)
- [ ] Advanced search filters
- [ ] Map view for nearby services
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Referral program

### Version 2.0 (Q4 2026)
- [ ] Video consultations
- [ ] AI-powered service recommendations
- [ ] Subscription plans
- [ ] Analytics dashboard
- [ ] White-label solution

---

**Made with ❤️ using React Native & Expo**

4.  **Start the development server**:
    ```bash
    npx expo start
    ```

5.  **Run on your device**:
    Scan the QR code appearing in your terminal with the **Expo Go** app.

## 📁 Project Structure

- `src/api`: Axios and Supabase clients.
- `src/components`: Atomic UI components (Common, Home, Services).
- `src/hooks`: Custom hooks (`useAuth`, `useTheme`).
- `src/navigation`: App navigation logic (Tabs, Stacks).
- `src/screens`: Main application screens.
- `src/theme`: Centralized design system.
- `src/types`: TypeScript interfaces.

## 🐛 Troubleshooting

If you see "Something went wrong" after scanning:
1.  Ensure your phone and computer are on the **same Wi-Fi network**.
2.  Clear the Metro bundler cache: `npx expo start -c`.
3.  Check that the `.env` file exists and is correctly formatted.
