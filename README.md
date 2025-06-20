# Coople Jobs - React Native App

A modern, professional job listing application built with React Native and Expo, designed for the Coople brand. This app demonstrates best practices in React Native development, including state management, API integration, offline support, and polished UX.

## 🚀 Features

- **Job Listings**: Browse available jobs with infinite scroll pagination
- **Favourites System**: Save and manage favourite jobs with local persistence
- **Job Details**: View comprehensive job information
- **Offline Support**: Graceful handling of network connectivity issues
- **Modern UI**: Branded interface with Coople's design language
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with RTK Query for efficient data fetching

## 📱 Screenshots

- **Jobs Tab**: Browse all available jobs with pull-to-refresh
- **Favourites Tab**: View saved jobs with instant toggle functionality
- **Job Details**: Comprehensive job information with external links
- **Modern Navigation**: Bottom tab navigation with branded headers

## 🛠 Tech Stack

### Core Technologies
- **React Native** (0.72+) - Cross-platform mobile development
- **Expo** (SDK 49+) - Development platform and build tools
- **TypeScript** - Type-safe JavaScript development

### State Management & Data
- **Redux Toolkit** - Predictable state management
- **RTK Query** - Efficient API data fetching and caching
- **Redux Persist** - Local storage for favourites persistence

### Navigation
- **React Navigation 6** - Navigation library
- **@react-navigation/stack** - Stack navigator for screen transitions
- **@react-navigation/bottom-tabs** - Bottom tab navigation

### UI & Styling
- **React Native StyleSheet** - Component styling
- **@expo/vector-icons** - Icon library (Ionicons)
- **react-native-safe-area-context** - Safe area handling

### Network & Connectivity
- **@react-native-community/netinfo** - Network connectivity detection

## 📦 Package Versions

```json
{
  "react-native": "0.72.6",
  "expo": "~49.0.0",
  "typescript": "^5.1.3",
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.1.2",
  "redux-persist": "^6.0.0",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/stack": "^6.3.17",
  "@react-navigation/bottom-tabs": "^6.5.8",
  "@expo/vector-icons": "^13.0.0",
  "react-native-safe-area-context": "4.6.3",
  "@react-native-community/netinfo": "9.3.10"
}
```

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CoopleLogo.tsx   # Brand logo component
│   └── JobCard.tsx      # Job listing card component
├── features/            # Redux slices and business logic
│   └── favourites/      # Favourites state management
│       └── favouritesSlice.ts
├── screens/             # Screen components
│   ├── JobListScreen.tsx    # Main jobs listing
│   ├── JobDetailsScreen.tsx # Individual job details
│   └── FavouritesScreen.tsx # Saved jobs
├── services/            # API and external services
│   └── coopleApi.ts     # RTK Query API configuration
├── store.ts             # Redux store configuration
└── App.tsx              # Root application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coople-jobs
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   yarn start
   # or
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## 📖 Code Breakdown

### 1. State Management Architecture

**Redux Store Setup** (`src/store.ts`):
- Configured with Redux Toolkit for simplified Redux usage
- Integrated with Redux Persist for local storage
- Combined reducers for scalable state management

**Favourites Slice** (`src/features/favourites/favouritesSlice.ts`):
- Manages favourite job IDs with toggle functionality
- Uses array structure for serialization compatibility
- Implements proper TypeScript typing

### 2. API Integration

**RTK Query Setup** (`src/services/coopleApi.ts`):
- Configured with Coople's public jobs API
- Implements pagination support for job listings
- Provides automatic caching and background updates
- Full TypeScript interfaces for API responses

**Key Features**:
- `useListJobsQuery`: Fetches paginated job listings
- `useGetJobQuery`: Retrieves individual job details
- Automatic error handling and loading states

### 3. Navigation Structure

**App Navigation** (`src/App.tsx`):
- Root Stack Navigator for global screen access
- Bottom Tab Navigator for main app sections
- Typed navigation with proper TypeScript support

**Navigation Flow**:
```
RootStack
├── MainTabs (Tab Navigator)
│   ├── Jobs (JobListScreen)
│   └── Favourites (FavouritesScreen)
└── JobDetails (JobDetailsScreen)
```

### 4. Component Architecture

**JobCard Component** (`src/components/JobCard.tsx`):
- Reusable job display component
- Handles favourite toggle functionality
- Consistent styling with Coople branding
- Proper TypeScript prop interfaces

**Screen Components**:
- **JobListScreen**: Main job browsing with infinite scroll
- **FavouritesScreen**: Saved jobs with Redux cache integration
- **JobDetailsScreen**: Comprehensive job information display

### 5. Error Handling & UX

**Loading States**:
- Skeleton loaders and spinners for data fetching
- Pull-to-refresh functionality
- Infinite scroll with loading indicators

**Error States**:
- Network connectivity detection
- User-friendly error messages
- Graceful fallbacks for failed requests

**Empty States**:
- Branded empty state messages
- Clear user guidance

## 🎨 Design System

### Color Palette
- **Primary**: `#f50057` (Coople Pink)
- **Background**: `#fff0f5` (Light Pink)
- **Text Primary**: `#22223b` (Dark Blue)
- **Text Secondary**: `#666` (Gray)
- **Accent**: `#888` (Light Gray)

### Typography
- **Headers**: Bold, 18-22px
- **Body**: Regular, 15-17px
- **Captions**: Regular, 13-15px

### Spacing
- **Card Padding**: 18-20px
- **Section Spacing**: 12-16px
- **Screen Padding**: 8-24px

## 🔧 Development Decisions

### Why These Technologies?

1. **Redux Toolkit + RTK Query**:
   - Simplified Redux boilerplate
   - Automatic caching and background updates
   - Built-in loading and error states
   - TypeScript-first approach

2. **React Navigation 6**:
   - Type-safe navigation
   - Modern API with hooks
   - Excellent performance
   - Rich ecosystem

3. **Expo**:
   - Rapid development and testing
   - Easy deployment and updates
   - Rich library ecosystem
   - Cross-platform compatibility

4. **TypeScript**:
   - Type safety prevents runtime errors
   - Better developer experience
   - Self-documenting code
   - Easier refactoring

### Performance Optimizations

1. **RTK Query Caching**: Automatic data caching reduces API calls
2. **Component Memoization**: Prevents unnecessary re-renders
3. **Efficient List Rendering**: FlatList with proper key extraction
4. **Lazy Loading**: Images and data loaded on demand

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Job listing loads and displays correctly
- [ ] Infinite scroll works properly
- [ ] Favourites toggle functions correctly
- [ ] Favourites persist after app restart
- [ ] Job details screen displays all information
- [ ] Offline state is handled gracefully
- [ ] Pull-to-refresh works on job list
- [ ] Navigation between screens is smooth

### Future Testing Improvements
- Unit tests for Redux slices
- Component testing with React Native Testing Library
- E2E testing with Detox
- Performance testing with Flipper

## 🚀 Deployment

### Expo Build
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for both platforms
expo build
```

### App Store Deployment
1. Configure app.json with proper metadata
2. Build production version
3. Submit to App Store Connect / Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is created for technical assessment purposes.

## 👨‍💻 Author

Built with ❤️ for Coople technical assessment

---

**Note**: This app demonstrates modern React Native development practices and is suitable for production use with proper testing and deployment configuration. 