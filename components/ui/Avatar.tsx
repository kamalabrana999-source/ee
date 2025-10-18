import { View, Image, Text } from 'react-native';

interface AvatarProps {
  imageUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  verified?: boolean;
}

export function Avatar({ imageUrl, name, size = 'md', verified = false }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-2xl',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View className="relative">
      <View
        className={`${sizeClasses[size]} rounded-full bg-primary items-center justify-center overflow-hidden`}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <Text className={`${textSizeClasses[size]} font-[Poppins_600SemiBold] text-white`}>
            {initials}
          </Text>
        )}
      </View>
      {verified && (
        <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent items-center justify-center border-2 border-white">
          <Text className="text-white text-xs">✓</Text>
        </View>
      )}
    </View>
  );
}
