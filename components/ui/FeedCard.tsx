import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Post } from '../../types';
import { Avatar } from './Avatar';
import { CategoryTag } from './CategoryTag';
import { useRouter } from 'expo-router';

interface FeedCardProps {
  post: Post;
}

export function FeedCard({ post }: FeedCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return t('feed.timeAgo', { time: `${minutes}min` });
    if (hours < 24) return t('feed.timeAgo', { time: `${hours}h` });
    return t('feed.timeAgo', { time: `${days}d` });
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-3 shadow-sm overflow-hidden"
      activeOpacity={0.7}
      onPress={() => router.push(`/post/${post.id}`)}
    >
      <View className="p-3">
        <View className="flex-row items-center mb-2">
          <Avatar
            imageUrl={post.author.avatarUrl}
            name={post.author.name}
            size="sm"
            verified={post.author.isVerified}
          />
          <View className="ml-2 flex-1">
            <Text className="text-sm font-[Poppins_600SemiBold] text-neutral-900">
              {post.author.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-xs font-[Inter_400Regular] text-neutral-500">
                {t('feed.distanceAway', { distance: formatDistance(post.distance) })} •{' '}
                {formatTime(post.createdAt)}
              </Text>
            </View>
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

      <View className="p-3">
        <Text className="text-base font-[Poppins_600SemiBold] text-neutral-900 mb-1">
          {post.title}
        </Text>
        <Text
          className="text-sm font-[Inter_400Regular] text-neutral-600"
          numberOfLines={2}
        >
          {post.description}
        </Text>
        <View className="flex-row items-center mt-2">
          <Text className="text-xs font-[Inter_500Medium] text-neutral-500">
            {post.commentCount} {t('post.comments')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
