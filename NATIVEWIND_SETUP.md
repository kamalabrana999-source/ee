# NeighbourHub - NativeWind Implementation Guide

## Overview

NeighbourHub is a mobile-first neighbourhood community app built with React Native, Expo, and **NativeWind** for styling. This document explains the NativeWind setup and provides examples of how it's used throughout the app.

## Brand Colors

The app uses a consistent color palette defined in `tailwind.config.js`:

- **Primary**: `#4CAF50` (neighbourhood-green)
- **Accent**: `#FFB000`
- **Background**: `#F7F7F7`
- **Neutrals**: Full grayscale palette from 50-900

## NativeWind Configuration

### 1. Core Setup Files

#### `tailwind.config.js`
Defines the design system including colors, fonts, and spacing:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        accent: '#FFB000',
        // ... more colors
      },
      fontFamily: {
        inter: ['Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold', 'Inter_700Bold'],
        poppins: ['Poppins_400Regular', 'Poppins_500Medium', 'Poppins_600SemiBold', 'Poppins_700Bold'],
      },
    },
  },
};
```

#### `metro.config.js`
Integrates NativeWind with Metro bundler:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

#### `global.css`
Base CSS file for Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. TypeScript Support

`nativewind-env.d.ts` provides type definitions:

```typescript
/// <reference types="nativewind/types" />
```

## Component Examples

### Example 1: FeedCard Component

The `FeedCard` component demonstrates NativeWind's power for building complex UI:

```tsx
<TouchableOpacity
  className="bg-white rounded-2xl mb-3 shadow-sm overflow-hidden"
  activeOpacity={0.7}
>
  <View className="p-3">
    <View className="flex-row items-center mb-2">
      <Avatar size="sm" verified={true} />
      <View className="ml-2 flex-1">
        <Text className="text-sm font-[Poppins_600SemiBold] text-neutral-900">
          {post.author.name}
        </Text>
      </View>
      <CategoryTag category={post.category} />
    </View>
  </View>

  {post.imageUrl && (
    <Image
      source={{ uri: post.imageUrl }}
      className="w-full h-48"
      resizeMode="cover"
    />
  )}
</TouchableOpacity>
```

**Key NativeWind Features Used:**
- `bg-white` - Background color
- `rounded-2xl` - Border radius
- `shadow-sm` - Elevation/shadow
- `flex-row` - Flexbox direction
- `items-center` - Vertical alignment
- `p-3` - Padding (3 * 8px = 24px from spacing scale)
- `font-[Poppins_600SemiBold]` - Custom font family
- `text-neutral-900` - Text color from palette

### Example 2: Avatar Component with Conditional Styling

```tsx
export function Avatar({ imageUrl, name, size = 'md', verified = false }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  return (
    <View className="relative">
      <View
        className={`${sizeClasses[size]} rounded-full bg-primary items-center justify-center`}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-full h-full" />
        ) : (
          <Text className="text-white font-[Poppins_600SemiBold]">
            {initials}
          </Text>
        )}
      </View>
      {verified && (
        <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent">
          <Text className="text-white text-xs">✓</Text>
        </View>
      )}
    </View>
  );
}
```

**Key Features:**
- Dynamic classes with template literals
- Responsive sizing with variant objects
- Absolute positioning for badge overlay
- Custom brand colors (`bg-primary`, `bg-accent`)

### Example 3: CategoryTag with Dynamic Colors

```tsx
export function CategoryTag({ category }: CategoryTagProps) {
  const backgroundColor = CATEGORY_COLORS[category];

  return (
    <View
      className="px-2 py-1 rounded-full"
      style={{ backgroundColor: backgroundColor + '20' }}
    >
      <Text
        className="text-xs font-[Inter_600SemiBold]"
        style={{ color: backgroundColor }}
      >
        {t(`post.categories.${category}`)}
      </Text>
    </View>
  );
}
```

**Key Features:**
- Hybrid styling: NativeWind classes + inline styles
- Alpha transparency with hex colors
- Utility classes for padding and typography

### Example 4: Create Post Screen Form

```tsx
<View className="mb-4">
  <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700 mb-2">
    {t('post.title')}
  </Text>
  <TextInput
    className="bg-white rounded-xl px-4 py-3 font-[Inter_400Regular] text-neutral-900 border border-neutral-300"
    placeholder="Enter a descriptive title"
    placeholderTextColor="#9E9E9E"
  />
</View>
```

**Key Features:**
- Form input styling with borders
- Consistent spacing with margin utilities
- Typography hierarchy
- Border utilities

## Typography System

### Font Families

**Inter** - Body text (400, 500, 600, 700 weights)
```tsx
<Text className="font-[Inter_400Regular]">Regular text</Text>
<Text className="font-[Inter_600SemiBold]">Semi-bold text</Text>
```

**Poppins** - Headings (400, 500, 600, 700 weights)
```tsx
<Text className="font-[Poppins_700Bold]">Bold heading</Text>
<Text className="font-[Poppins_600SemiBold]">Semi-bold heading</Text>
```

### Text Sizes
- `text-xs` - 12px
- `text-sm` - 14px
- `text-base` - 16px
- `text-lg` - 18px
- `text-xl` - 20px
- `text-2xl` - 24px
- `text-3xl` - 30px

## Spacing System

The app uses an 8px spacing scale:

```javascript
spacing: {
  0: '0px',
  1: '8px',   // p-1, m-1, etc
  2: '16px',  // p-2, m-2, etc
  3: '24px',  // p-3, m-3, etc
  4: '32px',  // p-4, m-4, etc
  5: '40px',  // p-5, m-5, etc
  6: '48px',  // p-6, m-6, etc
  7: '56px',  // p-7, m-7, etc
  8: '64px',  // p-8, m-8, etc
}
```

## Common Patterns

### Card Container
```tsx
<View className="bg-white rounded-2xl p-4 shadow-sm">
  {/* Content */}
</View>
```

### Button Primary
```tsx
<TouchableOpacity className="bg-primary rounded-full py-4 items-center justify-center">
  <Text className="text-white font-[Poppins_600SemiBold]">Button Text</Text>
</TouchableOpacity>
```

### Button Secondary
```tsx
<TouchableOpacity className="bg-neutral-200 rounded-full py-4 items-center justify-center">
  <Text className="text-neutral-700 font-[Poppins_600SemiBold]">Button Text</Text>
</TouchableOpacity>
```

### Screen Container
```tsx
<SafeAreaView className="flex-1 bg-background">
  <View className="px-4 py-3 bg-white border-b border-neutral-200">
    {/* Header */}
  </View>
  <ScrollView>
    {/* Content */}
  </ScrollView>
</SafeAreaView>
```

## Best Practices

1. **Use className for static styles**: All layout, spacing, and colors that don't change
2. **Use inline style for dynamic values**: Colors that change based on category, computed widths, etc
3. **Maintain consistency**: Use the defined spacing scale and color palette
4. **Component composition**: Build reusable components with NativeWind classes
5. **Typography hierarchy**: Use Poppins for headings, Inter for body text
6. **Responsive design**: Test on multiple screen sizes

## Dependencies

Key packages for NativeWind functionality:

```json
{
  "nativewind": "^4.2.1",
  "tailwindcss": "^3.4.18",
  "@expo-google-fonts/inter": "^0.4.2",
  "@expo-google-fonts/poppins": "^0.4.1"
}
```

## Platform Support

NativeWind works seamlessly across:
- iOS
- Android
- Web

No platform-specific styling code is needed for most cases.
