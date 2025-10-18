# NeighbourHub - App Overview

## 🎯 What This Is

A **complete mobile-first neighbourhood community app** built with React Native, Expo, and NativeWind. All UI screens are implemented and ready to connect to a backend.

## 📱 App Flow

```
┌─────────────────┐
│   Launch App    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Onboarding    │  ← Language selection + location permission
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│              Tab Navigation                  │
├─────────┬─────────┬─────────┬──────┬────────┤
│  Home   │   Map   │  Post   │ Chat │ Profile│
└─────────┴─────────┴─────────┴──────┴────────┘
     │         │         │         │       │
     │         │         │         │       └─► User Profile + Stats
     │         │         │         └──────────► Conversations List
     │         │         └────────────────────► Create Post Form
     │         └──────────────────────────────► Interactive Map
     │
     ▼
┌──────────────┐
│  Post Feed   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Post Details │  ← Comments, actions, full view
└──────────────┘
```

## 🎨 Visual Design

### Brand Colors
- **Primary Green**: `#4CAF50` - Used for main actions, brand elements
- **Accent Yellow**: `#FFB000` - Used for highlights, verification badges
- **Background**: `#F7F7F7` - Light gray for app background
- **White**: `#FFFFFF` - Cards and containers
- **Neutrals**: Full grayscale palette for text and borders

### Typography
- **Headings**: Poppins (Bold 700, SemiBold 600)
- **Body Text**: Inter (Regular 400, Medium 500, SemiBold 600)
- **Sizes**: 12px to 30px scale

### Design Style
- **Modern & Clean**: Rounded corners (16-24px), ample white space
- **Card-Based**: Elevated cards with subtle shadows
- **Friendly**: Soft colors, approachable design
- **Community-Focused**: Emphasis on connections and local feel

## 📐 Screen Breakdown

### 1️⃣ Onboarding Screen
**Purpose**: Welcome and setup

**Elements**:
```
┌──────────────────────────┐
│     Large Green Icon     │
│         (MapPin)         │
├──────────────────────────┤
│   Welcome to NeighbourHub│
│  Connect with neighbours │
├──────────────────────────┤
│  [Language Selector]     │
│  [EN][RU][TR][TH][ID]    │
├──────────────────────────┤
│  Location Permission Box │
├──────────────────────────┤
│  [Get Started Button]    │
│   Skip for now (link)    │
└──────────────────────────┘
```

### 2️⃣ Home Feed
**Purpose**: Browse community posts

**Elements**:
```
┌──────────────────────────┐
│ [Avatar] Community Feed  │
│ [Search bar........] 🔔  │
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │ [Avatar] Sarah J. ✓  │ │
│ │ 450m • 1h [Category] │ │
│ │ ──────────────────── │ │
│ │     [Post Image]     │ │
│ │ ──────────────────── │ │
│ │ Lost Golden Retriever│ │
│ │ My dog went missing..│ │
│ │ 5 Comments           │ │
│ └──────────────────────┘ │
│                          │
│ [More posts...]          │
└──────────────────────────┘
│  🏠   🗺️   ➕   💬   👤  │
└──────────────────────────┘
```

### 3️⃣ Map View
**Purpose**: Visualize posts geographically

**Elements**:
```
┌──────────────────────────┐
│      Map View            │
├──────────────────────────┤
│         🗺️               │
│      📍 📍 📍            │
│    📍       📍           │
│       📍                 │
│              📍          │
│                          │
│  [Bottom Sheet Preview]  │
│  ┌────────────────────┐  │
│  │ [Category Badge]   │  │
│  │ Post Title         │  │
│  │ Preview text...    │  │
│  │ [View Details]     │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

### 4️⃣ Create Post
**Purpose**: Publish new posts

**Elements**:
```
┌──────────────────────────┐
│     Create Post          │
├──────────────────────────┤
│ Select Category:         │
│ [Lost][Market][Safety].. │
├──────────────────────────┤
│ Title:                   │
│ [...................]     │
├──────────────────────────┤
│ Description:             │
│ [                    ]   │
│ [                    ]   │
│ [                    ]   │
├──────────────────────────┤
│ Add Image:               │
│ ┌──────────────────────┐ │
│ │     📷 Tap to       │ │
│ │   select image      │ │
│ └──────────────────────┘ │
├──────────────────────────┤
│ Visibility: 1.0km        │
│ [500m][1km][2km][5km]    │
├──────────────────────────┤
│ 📍 Current Location      │
├──────────────────────────┤
│      [Submit Post]       │
└──────────────────────────┘
```

### 5️⃣ Messages
**Purpose**: Chat with neighbours

**Elements**:
```
┌──────────────────────────┐
│       Messages           │
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │[👤] Sarah Johnson    │ │
│ │Thanks for update! ②  │ │
│ │30m ago              │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │[👤] Mike Chen        │ │
│ │See you at the BBQ    │ │
│ │2h ago               │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │[👤] Emma Wilson ①    │ │
│ │Is the bike still...  │ │
│ │1d ago               │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

### 6️⃣ Profile
**Purpose**: User info and settings

**Elements**:
```
┌──────────────────────────┐
│  Profile          ⚙️     │
├──────────────────────────┤
│       [👤 Large]         │
│      John Doe ✓          │
│   Downtown District      │
│   [Verified Local]       │
├──────────────────────────┤
│ ┌──────────┬───────────┐ │
│ │    📈   │    🏆    │ │
│ │    5    │    23     │ │
│ │Posts/wk │Neighbours │ │
│ └──────────┴───────────┘ │
├──────────────────────────┤
│ ✏️  Edit Profile         │
│ ⚙️  Settings             │
│ 🚪  Logout               │
└──────────────────────────┘
```

### 7️⃣ Post Details
**Purpose**: Full post view with interaction

**Elements**:
```
┌──────────────────────────┐
│ ← Post Details      ↗️   │
├──────────────────────────┤
│    [Full Post Image]     │
├──────────────────────────┤
│ [Category Badge]         │
│                          │
│ Lost Golden Retriever    │
│                          │
│ [👤] Sarah J. ✓  🚩      │
│ 1h ago • 450m away       │
│                          │
│ Full description text    │
│ goes here with all       │
│ the details...           │
│                          │
│ [💬 Reply] [↗️ Share]    │
├──────────────────────────┤
│ Comments (5)             │
│ ┌──────────────────────┐ │
│ │[👤] Mike Chen        │ │
│ │I think I saw a dog...│ │
│ │30m ago              │ │
│ └──────────────────────┘ │
│ [More comments...]       │
└──────────────────────────┘
│ [Type message......]  💬 │
└──────────────────────────┘
```

## 🎭 UI Components Library

### Avatar Component
- 3 sizes: small (32px), medium (48px), large (80px)
- Verification badge support
- Fallback to initials if no image
- Used in: Feed, Profile, Messages, Post Details

### FeedCard Component
- Complete post preview
- Author info with verification
- Category badge
- Distance and time
- Image support
- Comment count
- Used in: Home Feed

### CategoryTag Component
- 5 category types with unique colors
- Rounded pill design
- Translates to user's language
- Used in: Feed, Create Post, Post Details

## 🌍 Internationalization

**5 Languages Supported**:
1. 🇬🇧 English (en)
2. 🇷🇺 Russian (ru)
3. 🇹🇷 Turkish (tr)
4. 🇹🇭 Thai (th)
5. 🇮🇩 Indonesian (id)

**Translation Coverage**:
- All UI strings
- Category names
- Error messages
- Button labels
- Form placeholders

**Example Translations**:
| English | Russian | Turkish | Thai | Indonesian |
|---------|---------|---------|------|------------|
| Home | Главная | Ana Sayfa | หน้าหลัก | Beranda |
| Messages | Сообщения | Mesajlar | ข้อความ | Pesan |
| Profile | Профиль | Profil | โปรไฟล์ | Profil |

## 🎨 NativeWind Styling

All components use utility classes:

```tsx
// Card
<View className="bg-white rounded-2xl p-4 shadow-sm">

// Primary Button
<TouchableOpacity className="bg-primary rounded-full py-4">
  <Text className="text-white font-[Poppins_600SemiBold]">
    Button
  </Text>
</TouchableOpacity>

// Heading
<Text className="text-2xl font-[Poppins_700Bold] text-neutral-900">
  Title
</Text>

// Body Text
<Text className="text-base font-[Inter_400Regular] text-neutral-600">
  Description
</Text>
```

## 📊 Categories System

**5 Post Categories**:

1. **Lost & Found** 🔍
   - Color: Red `#FF6B6B`
   - Use: Missing pets, lost items, found items

2. **Marketplace** 🛍️
   - Color: Teal `#4ECDC4`
   - Use: Buy/sell items, services

3. **Safety Alert** ⚠️
   - Color: Orange `#FFA502`
   - Use: Security concerns, warnings

4. **Event** 📅
   - Color: Purple `#A29BFE`
   - Use: Community gatherings, meetups

5. **General** 💬
   - Color: Green `#4CAF50`
   - Use: Announcements, discussions

## 🏗️ Architecture

### State Management
- **Local State**: React useState for UI state
- **App State**: Zustand for user, location, language
- **Server State**: TanStack Query (configured, ready to use)

### Data Flow
```
Components → Zustand Store → App State
           ↓
Components → TanStack Query → API (not yet implemented)
           ↓
Components → Local State → UI State
```

### Navigation
- **Expo Router**: File-based routing
- **Tabs**: Bottom tab bar for main screens
- **Stack**: Modal screens (post details)
- **Deep Linking**: Ready for URL-based navigation

## 📦 Dependencies Summary

### Core (7)
- react-native, expo, typescript, expo-router

### UI & Styling (3)
- nativewind, tailwindcss, lucide-react-native

### State & Data (3)
- zustand, @tanstack/react-query, react-native-mmkv

### i18n (2)
- i18next, react-i18next

### Fonts (2)
- @expo-google-fonts/inter, @expo-google-fonts/poppins

### Features (6)
- expo-location, expo-image-picker, react-native-maps
- expo-camera, @shopify/flash-list, @supabase/supabase-js

## ✅ What Works

- ✅ All screens render correctly
- ✅ Navigation flows properly
- ✅ Language switching works
- ✅ NativeWind styling applied
- ✅ Fonts load correctly
- ✅ TypeScript compiles
- ✅ Mock data displays
- ✅ Icons render
- ✅ Forms are functional
- ✅ Responsive on different screen sizes

## ⚠️ What's Next

- ⚠️ Connect to Supabase backend
- ⚠️ Implement authentication
- ⚠️ Add real data fetching
- ⚠️ Implement image upload
- ⚠️ Add real-time features
- ⚠️ Create API routes
- ⚠️ Add push notifications
- ⚠️ Implement search
- ⚠️ Add filtering
- ⚠️ Create user profiles

## 🚀 Quick Commands

```bash
# Start development
npm run dev

# Type check
npm run typecheck

# Build for web
npm run build:web

# Lint
npm run lint
```

## 📚 Documentation Files

1. **QUICKSTART.md** - Start here for immediate development
2. **NATIVEWIND_SETUP.md** - Detailed styling guide and examples
3. **PROJECT_STRUCTURE.md** - Complete technical documentation
4. **APP_OVERVIEW.md** - This file (visual overview)

## 💡 Key Highlights

### 1. Mobile-First Design
- Optimized for phone screens
- Touch-friendly tap targets
- Smooth scrolling
- Native feel

### 2. Fully Typed
- TypeScript throughout
- No `any` types
- Proper interfaces
- Type-safe routing

### 3. Production-Ready UI
- Complete screen implementations
- Reusable components
- Consistent styling
- Accessibility ready

### 4. Developer-Friendly
- Clear file structure
- Well-documented code
- Consistent patterns
- Easy to extend

### 5. Internationalization
- 5 languages built-in
- Easy to add more
- Professional translations
- Locale-aware formatting

## 🎯 Use Cases

**Perfect for**:
- Neighbourhood watch apps
- Community bulletin boards
- Local marketplace apps
- Nextdoor-style platforms
- Hyperlocal social networks
- Community engagement tools

## 📱 Platform Support

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| UI/Navigation | ✅ | ✅ | ✅ |
| Maps | ✅ | ✅ | ⚠️ |
| Location | ✅ | ✅ | ⚠️ |
| Images | ✅ | ✅ | ✅ |
| Fonts | ✅ | ✅ | ✅ |
| Styling | ✅ | ✅ | ✅ |

✅ = Fully supported
⚠️ = Limited or fallback

---

**Built with ❤️ using React Native, Expo, and NativeWind**
