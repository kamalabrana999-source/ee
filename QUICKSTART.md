# NeighbourHub - Quick Start Guide

## What You Have

A fully functional mobile-first neighbourhood community app UI built with:
- ✅ React Native + Expo
- ✅ NativeWind (Tailwind for React Native)
- ✅ 7 complete screens with navigation
- ✅ 5 language support (en, ru, tr, th, id)
- ✅ Custom fonts (Inter + Poppins)
- ✅ Reusable UI components
- ✅ TypeScript throughout
- ✅ State management (Zustand)
- ✅ Mock data for testing

## Screens Included

1. **Onboarding** - Welcome screen with language selection and location permission
2. **Home Feed** - Scrollable list of community posts
3. **Map View** - Interactive map showing nearby posts (mobile only)
4. **Create Post** - Form to create new posts with categories
5. **Messages** - Chat conversations list
6. **Profile** - User profile with stats
7. **Post Details** - Full post view with comments

## Getting Started

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

This will open Expo Dev Tools. You can:
- Press `w` to open in web browser
- Scan QR code with Expo Go app (iOS/Android)
- Press `i` for iOS simulator
- Press `a` for Android emulator

### 3. View the App

**On Web:**
- Navigate to http://localhost:8081
- Note: Maps and some native features won't work on web

**On Mobile (Recommended):**
1. Download Expo Go from App Store / Play Store
2. Scan the QR code from terminal
3. Full features including maps will work

## Project Structure

```
app/
├── (tabs)/           # Main tab screens
│   ├── index.tsx    # Home Feed
│   ├── map.tsx      # Map View
│   ├── create.tsx   # Create Post
│   ├── messages.tsx # Messages
│   └── profile.tsx  # Profile
├── onboarding/      # Onboarding flow
└── post/[id].tsx    # Post Details

components/ui/       # Reusable components
├── Avatar.tsx
├── CategoryTag.tsx
└── FeedCard.tsx

locales/            # Translations
├── en.json         # English
├── ru.json         # Russian
├── tr.json         # Turkish
├── th.json         # Thai
└── id.json         # Indonesian

store/              # State management
└── useAppStore.ts  # Zustand store

types/              # TypeScript types
└── index.ts
```

## Key Features

### NativeWind Styling
All components use Tailwind-style utility classes:

```tsx
<View className="bg-white rounded-2xl p-4 shadow-sm">
  <Text className="text-lg font-[Poppins_600SemiBold] text-neutral-900">
    Hello World
  </Text>
</View>
```

### Brand Colors
- Primary: `bg-primary` (#4CAF50 - green)
- Accent: `bg-accent` (#FFB000 - yellow)
- Background: `bg-background` (#F7F7F7)
- Neutral: `text-neutral-900` to `text-neutral-50`

### Typography
- Headings: `font-[Poppins_600SemiBold]` or `font-[Poppins_700Bold]`
- Body: `font-[Inter_400Regular]` or `font-[Inter_500Medium]`

### Multi-language
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  // Use translations
  return <Text>{t('common.home')}</Text>;

  // Change language
  i18n.changeLanguage('ru'); // Switch to Russian
}
```

## Mock Data

All screens use mock data currently. Examples:

- **MOCK_POSTS**: Sample posts in feed and map
- **MOCK_CONVERSATIONS**: Sample chat list
- **MOCK_COMMENTS**: Sample comments

Replace these with real API calls when ready.

## Common Tasks

### Change App Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      accent: '#YOUR_COLOR',
    }
  }
}
```

### Add a New Screen
1. Create file in `app/` directory
2. Use `.tsx` extension
3. Export default component
4. Navigate with `useRouter()`:
```tsx
import { useRouter } from 'expo-router';

function MyScreen() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/new-screen')}>
      <Text>Go to new screen</Text>
    </TouchableOpacity>
  );
}
```

### Add Translations
1. Add keys to all files in `locales/` directory:
```json
{
  "myFeature": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

2. Use in component:
```tsx
const { t } = useTranslation();
<Text>{t('myFeature.title')}</Text>
```

### Create New Component
1. Create file in `components/ui/`
2. Use NativeWind classes:
```tsx
export function MyButton({ onPress, children }) {
  return (
    <TouchableOpacity
      className="bg-primary rounded-full py-3 px-6"
      onPress={onPress}
    >
      <Text className="text-white font-[Poppins_600SemiBold]">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
```

## Testing Different Languages

In the onboarding screen, tap on language buttons to switch:
- English
- Русский (Russian)
- Türkçe (Turkish)
- ไทย (Thai)
- Bahasa Indonesia

## Debugging

### Type Check
```bash
npm run typecheck
```

### Check Errors
If the app crashes, check:
1. Terminal for error messages
2. Expo Dev Tools (in browser)
3. Console logs in app

### Common Issues

**Fonts not loading:**
- Wait for splash screen to hide
- Fonts load asynchronously

**Map not showing:**
- Maps only work on iOS/Android, not web
- Check location permissions

**Images not loading:**
- Pexels images used (should work)
- Check internet connection

## Next Steps

### 1. Add Backend (Supabase)
The project has Supabase configured. Next:
- Create database tables
- Add authentication
- Replace mock data with real queries

### 2. Add Real Features
- User registration/login
- Post creation with image upload
- Real-time chat
- Push notifications
- Search and filters

### 3. Enhance UI
- Add loading states
- Error handling
- Empty states
- Skeleton screens
- Pull-to-refresh

### 4. Testing
- Add unit tests
- Test on real devices
- Gather user feedback

## Resources

### Documentation
- **NativeWind**: See `NATIVEWIND_SETUP.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`
- **Expo Docs**: https://docs.expo.dev
- **NativeWind Docs**: https://www.nativewind.dev

### Key Libraries
- Expo Router: File-based routing
- Zustand: State management
- TanStack Query: Data fetching (setup ready)
- i18next: Internationalization
- Lucide: Icons

## Support

**TypeScript Errors?**
```bash
npm run typecheck
```

**Need to Reset?**
```bash
npm start -- --clear
```

**Rebuild Dependencies?**
```bash
rm -rf node_modules
npm install
```

## Tips

1. **Mobile First**: Test on mobile device for best experience
2. **Hot Reload**: Changes reflect instantly (save file)
3. **Console Logs**: Check terminal and Expo Dev Tools
4. **Icons**: Use Lucide icons: `import { Home } from 'lucide-react-native'`
5. **Navigation**: Use `router.push()` and `router.back()`

## What's Working

✅ All navigation flows
✅ All screens render correctly
✅ Language switching
✅ NativeWind styling
✅ Fonts loading
✅ Mock data display
✅ TypeScript compilation
✅ Responsive layout

## What Needs Backend

⚠️ User authentication
⚠️ Post creation (save to DB)
⚠️ Real-time chat
⚠️ Image upload
⚠️ Location services (save/query)
⚠️ User profiles
⚠️ Comments and replies

---

**Ready to start!** Run `npm run dev` and begin exploring the app.

For detailed documentation, see:
- `NATIVEWIND_SETUP.md` - Styling guide
- `PROJECT_STRUCTURE.md` - Complete project overview
