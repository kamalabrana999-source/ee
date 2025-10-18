# NeighbourHub - Project Structure

## Overview

NeighbourHub is a mobile-first neighbourhood community application built with React Native, Expo, and NativeWind. This document provides a complete overview of the project structure and implementation.

## Technology Stack

### Core Technologies
- **React Native**: Mobile app framework
- **Expo SDK 54**: Development platform
- **TypeScript**: Type-safe development
- **NativeWind 4.2**: Utility-first styling (Tailwind for React Native)

### State Management
- **Zustand**: Lightweight state management for app-level state
- **TanStack Query**: Server state and data fetching

### UI & Styling
- **NativeWind**: Tailwind CSS for React Native
- **Lucide React Native**: Icon library
- **Expo Fonts**: Inter (body) and Poppins (headings)

### Navigation
- **Expo Router**: File-based routing
- **React Navigation**: Tab navigation

### Internationalization
- **i18next**: Internationalization framework
- **react-i18next**: React bindings for i18next
- **5 Languages Supported**: English, Russian, Turkish, Thai, Indonesian

### Other Libraries
- **expo-location**: Location services
- **expo-image-picker**: Image selection
- **react-native-maps**: Map integration
- **react-native-mmkv**: Local storage

## Folder Structure

```
project/
├── app/                          # Expo Router screens
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx          # Tab bar configuration
│   │   ├── index.tsx            # Home Feed screen
│   │   ├── map.tsx              # Map View screen
│   │   ├── create.tsx           # Create Post screen
│   │   ├── messages.tsx         # Messages screen
│   │   └── profile.tsx          # Profile screen
│   ├── post/
│   │   └── [id].tsx             # Post Details (dynamic route)
│   ├── onboarding/
│   │   └── index.tsx            # Onboarding screen
│   ├── index.tsx                # Root redirect
│   ├── _layout.tsx              # Root layout with fonts
│   └── +not-found.tsx           # 404 screen
│
├── components/                   # Reusable components
│   └── ui/
│       ├── Avatar.tsx           # Avatar with verification badge
│       ├── CategoryTag.tsx      # Category badge
│       └── FeedCard.tsx         # Post card component
│
├── store/                        # State management
│   └── useAppStore.ts           # Zustand store
│
├── locales/                      # Internationalization
│   ├── en.json                  # English translations
│   ├── ru.json                  # Russian translations
│   ├── tr.json                  # Turkish translations
│   ├── th.json                  # Thai translations
│   └── id.json                  # Indonesian translations
│
├── types/                        # TypeScript definitions
│   └── index.ts                 # App-wide types
│
├── constants/                    # App constants
│   └── categories.ts            # Category colors and icons
│
├── utils/                        # Utility functions
│   └── i18n.ts                  # i18next configuration
│
├── hooks/                        # Custom hooks
│   └── useFrameworkReady.ts     # Framework initialization
│
├── assets/                       # Static assets
│   └── images/
│
├── tailwind.config.js           # NativeWind configuration
├── metro.config.js              # Metro bundler config
├── global.css                   # Tailwind directives
├── nativewind-env.d.ts          # NativeWind types
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
└── app.json                     # Expo configuration
```

## Screens Overview

### 1. Onboarding Screen (`/onboarding`)
**Purpose**: Welcome users, request location permission, language selection

**Features**:
- Language selector (5 languages)
- Location permission request
- Brand introduction
- Skip option

**Key Components**: Language buttons, location permission card

---

### 2. Home Feed Screen (`/(tabs)/index`)
**Purpose**: Display community posts in a scrollable feed

**Features**:
- Header with avatar and notifications
- Search bar
- Post cards with:
  - Author info
  - Category badge
  - Image (if available)
  - Distance and time
  - Comment count

**Key Components**: FeedCard, Avatar, CategoryTag

---

### 3. Map View Screen (`/(tabs)/map`)
**Purpose**: Show posts on an interactive map

**Features**:
- Full-screen map (iOS/Android)
- Color-coded pins by category
- Bottom sheet preview on pin tap
- View details button

**Key Components**: MapView, Marker, bottom sheet preview

**Note**: Web shows fallback message (maps not supported)

---

### 4. Create Post Screen (`/(tabs)/create`)
**Purpose**: Form to create new community posts

**Features**:
- Category selection (5 categories)
- Title input
- Description textarea
- Image picker
- Visibility radius slider (500m - 5km)
- Location display
- Form validation

**Key Components**: Category selector, image picker, radius buttons

---

### 5. Messages Screen (`/(tabs)/messages`)
**Purpose**: List of conversations with neighbours

**Features**:
- Conversation list with avatars
- Last message preview
- Timestamp
- Unread badge count

**Key Components**: Conversation card, Avatar, unread badge

---

### 6. Profile Screen (`/(tabs)/profile`)
**Purpose**: User profile and statistics

**Features**:
- Large avatar with verification badge
- User info (name, neighbourhood)
- Statistics cards:
  - Posts this week
  - Neighbours helped
- Action buttons:
  - Edit profile
  - Settings
  - Logout

**Key Components**: Avatar, stat cards, action list

---

### 7. Post Details Screen (`/post/[id]`)
**Purpose**: Full post view with comments

**Features**:
- Full image display
- Complete description
- Author info
- Category badge
- Action buttons (Reply, Share, Report)
- Comments list
- Comment input at bottom

**Key Components**: Image carousel, comment list, action buttons

---

## Data Types

### Post
```typescript
interface Post {
  id: string;
  title: string;
  description: string;
  category: 'lostFound' | 'marketplace' | 'safety' | 'event' | 'general';
  imageUrl?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  distance: number;
  createdAt: Date;
  visibilityRadius: number;
  commentCount: number;
}
```

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isVerified: boolean;
  location: {
    latitude: number;
    longitude: number;
    neighbourhood: string;
  };
  stats: {
    postsThisWeek: number;
    neighboursHelped: number;
  };
}
```

## State Management

### Zustand Store (`useAppStore`)

**State**:
- `user`: Current user object
- `currentLocation`: User's GPS coordinates
- `selectedLanguage`: Active language code
- `isDarkMode`: Theme preference

**Actions**:
- `setUser(user)`: Update user
- `setCurrentLocation(location)`: Update location
- `setSelectedLanguage(language)`: Change language
- `toggleDarkMode()`: Toggle theme

## Styling Architecture

### Design Tokens

**Colors**:
- Primary: `#4CAF50` (green)
- Accent: `#FFB000` (yellow)
- Background: `#F7F7F7` (light gray)
- Neutrals: 50-900 scale

**Typography**:
- Headings: Poppins (400, 500, 600, 700)
- Body: Inter (400, 500, 600, 700)

**Spacing**: 8px base unit (0-8 scale)

### NativeWind Usage

All components use utility classes:

```tsx
// Example
<View className="bg-white rounded-2xl p-4 shadow-sm">
  <Text className="text-lg font-[Poppins_600SemiBold] text-neutral-900">
    Title
  </Text>
</View>
```

See `NATIVEWIND_SETUP.md` for detailed styling guide.

## Mock Data

All screens currently use mock data:
- `MOCK_POSTS`: Sample posts for feed/map
- `MOCK_CONVERSATIONS`: Sample messages
- `MOCK_COMMENTS`: Sample comments

**Next Steps**: Replace with actual API calls using TanStack Query

## Internationalization

### Language Files Structure

Each language file (`locales/*.json`) contains:
- `common`: Shared UI strings
- `onboarding`: Welcome screen
- `feed`: Home feed
- `post`: Post-related strings
- `map`: Map view
- `messages`: Messages screen
- `profile`: Profile screen

### Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('common.home')}</Text>;
}
```

## Navigation Flow

```
Index (/)
  → Onboarding (/onboarding)
    → Tabs (/(tabs))
      ├── Home Feed (/(tabs)/index)
      │   └── Post Details (/post/[id])
      ├── Map (/(tabs)/map)
      ├── Create Post (/(tabs)/create)
      ├── Messages (/(tabs)/messages)
      └── Profile (/(tabs)/profile)
```

## Key Features Implemented

✅ Tab-based navigation
✅ NativeWind styling system
✅ Multi-language support (5 languages)
✅ Custom fonts (Inter + Poppins)
✅ Zustand state management
✅ TanStack Query setup
✅ Location services integration
✅ Image picker integration
✅ Map integration (mobile)
✅ Reusable UI components
✅ TypeScript throughout
✅ Mock data for all screens
✅ Responsive design

## Features Not Yet Implemented

⚠️ Backend API integration
⚠️ Authentication system
⚠️ Real-time chat
⚠️ Push notifications
⚠️ Database storage
⚠️ Image upload to cloud
⚠️ User registration/login
⚠️ Search functionality
⚠️ Post filtering
⚠️ User profiles editing

## Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run typecheck

# Build for web
npm run build:web
```

## Platform Notes

### Web
- Maps not supported (shows fallback)
- Some native APIs unavailable
- Optimized for mobile viewports

### iOS/Android
- Full feature support
- Native map integration
- Location services
- Image picker
- Camera access

## Next Steps for Development

1. **Backend Integration**
   - Set up Supabase (already configured)
   - Create database schema
   - Implement authentication
   - Create API routes

2. **Real-time Features**
   - WebSocket for chat
   - Real-time post updates
   - Notifications

3. **Enhanced Features**
   - Search and filters
   - User profiles
   - Post reporting
   - Image optimization
   - Offline support with MMKV

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

## Documentation

- `NATIVEWIND_SETUP.md`: Detailed NativeWind implementation guide
- `PROJECT_STRUCTURE.md`: This file
- Inline code comments for complex logic

## Support

For questions or issues:
1. Check TypeScript errors: `npm run typecheck`
2. Review NativeWind setup guide
3. Check Expo documentation
4. Review component examples
