import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Share2, Flag, MessageCircle } from 'lucide-react-native';
import { Avatar } from '../../components/ui/Avatar';
import { CategoryTag } from '../../components/ui/CategoryTag';
import { Post, Comment } from '../../types';

const MOCK_POST: Post = {
  id: '1',
  title: 'Lost Golden Retriever',
  description:
    'My dog went missing near the park yesterday evening around 6 PM. He is a friendly golden retriever, 3 years old, and answers to the name Max. He was wearing a blue collar with a tag. If you have seen him or have any information, please contact me immediately. We miss him very much and are offering a reward.',
  category: 'lostFound',
  imageUrl:
    'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800',
  location: {
    latitude: 37.7749,
    longitude: -122.4194,
    address: 'Central Park',
  },
  author: {
    id: 'user1',
    name: 'Sarah Johnson',
    avatarUrl:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    isVerified: true,
  },
  distance: 450,
  createdAt: new Date(Date.now() - 3600000),
  visibilityRadius: 2000,
  commentCount: 5,
};

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    postId: '1',
    content: 'I think I saw a dog matching this description near Oak Street this morning!',
    author: {
      id: 'user2',
      name: 'Mike Chen',
    },
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: '2',
    postId: '1',
    content: "I'll keep an eye out in my neighborhood. Hope you find Max soon!",
    author: {
      id: 'user3',
      name: 'Emma Wilson',
      avatarUrl:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    createdAt: new Date(Date.now() - 3600000),
  },
];

export default function PostDetailsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}min ${t('feed.timeAgo', { time: '' })}`;
    if (hours < 24) return `${hours}h ${t('feed.timeAgo', { time: '' })}`;
    return `${days}d ${t('feed.timeAgo', { time: '' })}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-3 bg-white border-b border-neutral-200 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft color="#212121" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-[Poppins_600SemiBold] text-neutral-900 flex-1 ml-2">
          Post Details
        </Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Share2 color="#212121" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white">
          {MOCK_POST.imageUrl && (
            <Image source={{ uri: MOCK_POST.imageUrl }} className="w-full h-64" resizeMode="cover" />
          )}

          <View className="p-4">
            <CategoryTag category={MOCK_POST.category} />

            <Text className="text-2xl font-[Poppins_700Bold] text-neutral-900 mt-3">
              {MOCK_POST.title}
            </Text>

            <View className="flex-row items-center justify-between mt-3">
              <View className="flex-row items-center flex-1">
                <Avatar
                  imageUrl={MOCK_POST.author.avatarUrl}
                  name={MOCK_POST.author.name}
                  size="sm"
                  verified={MOCK_POST.author.isVerified}
                />
                <View className="ml-2 flex-1">
                  <Text className="text-sm font-[Poppins_600SemiBold] text-neutral-900">
                    {MOCK_POST.author.name}
                  </Text>
                  <Text className="text-xs font-[Inter_400Regular] text-neutral-500">
                    {formatTime(MOCK_POST.createdAt)} • {MOCK_POST.distance}m away
                  </Text>
                </View>
              </View>

              <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <Flag color="#FF6B6B" size={20} />
              </TouchableOpacity>
            </View>

            <Text className="text-base font-[Inter_400Regular] text-neutral-700 mt-4 leading-6">
              {MOCK_POST.description}
            </Text>

            <View className="flex-row items-center mt-4 pt-4 border-t border-neutral-200">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 bg-primary/10 rounded-lg">
                <MessageCircle color="#4CAF50" size={20} />
                <Text className="text-sm font-[Inter_600SemiBold] text-primary ml-2">
                  {t('post.reply')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 bg-neutral-100 rounded-lg ml-2">
                <Share2 color="#616161" size={20} />
                <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700 ml-2">
                  {t('post.share')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mt-2 bg-white p-4">
          <Text className="text-lg font-[Poppins_600SemiBold] text-neutral-900 mb-4">
            {t('post.comments')} ({MOCK_COMMENTS.length})
          </Text>

          {MOCK_COMMENTS.map((comment) => (
            <View key={comment.id} className="mb-4 pb-4 border-b border-neutral-100">
              <View className="flex-row items-start">
                <Avatar imageUrl={comment.author.avatarUrl} name={comment.author.name} size="sm" />
                <View className="flex-1 ml-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-[Poppins_600SemiBold] text-neutral-900">
                      {comment.author.name}
                    </Text>
                    <Text className="text-xs font-[Inter_400Regular] text-neutral-500">
                      {formatTime(comment.createdAt)}
                    </Text>
                  </View>
                  <Text className="text-sm font-[Inter_400Regular] text-neutral-700 mt-1">
                    {comment.content}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="h-20" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-3">
        <View className="flex-row items-center">
          <TextInput
            className="flex-1 bg-background rounded-full px-4 py-3 font-[Inter_400Regular] text-neutral-900 mr-2"
            placeholder={t('messages.typeMessage')}
            placeholderTextColor="#9E9E9E"
          />
          <TouchableOpacity className="w-12 h-12 bg-primary rounded-full items-center justify-center">
            <MessageCircle color="#FFFFFF" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
