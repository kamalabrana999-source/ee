import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Filter, TrendingUp } from 'lucide-react-native';
import { FeedCard } from '../../components/ui/FeedCard';
import { Avatar } from '../../components/ui/Avatar';
import { Post, PostCategory } from '../../types';
import { useState } from 'react';
import { CATEGORY_COLORS } from '../../constants/categories';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Lost Golden Retriever',
    description: 'My dog went missing near the park yesterday evening. He is friendly and answers to Max. Please contact if seen.',
    category: 'lostFound',
    imageUrl: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Central Park',
    },
    author: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      isVerified: true,
    },
    distance: 450,
    createdAt: new Date(Date.now() - 3600000),
    visibilityRadius: 2000,
    commentCount: 5,
  },
  {
    id: '2',
    title: 'Neighbourhood BBQ This Saturday',
    description: 'Join us for a community BBQ at the park pavilion. Bring your family and friends! Food and drinks provided.',
    category: 'event',
    imageUrl: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Community Park',
    },
    author: {
      id: 'user2',
      name: 'Mike Chen',
      isVerified: true,
    },
    distance: 780,
    createdAt: new Date(Date.now() - 7200000),
    visibilityRadius: 3000,
    commentCount: 12,
  },
  {
    id: '3',
    title: 'Bicycle for Sale',
    description: 'Selling a barely used mountain bike. Great condition, asking $200. Perfect for commuting!',
    category: 'marketplace',
    imageUrl: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Oak Street',
    },
    author: {
      id: 'user3',
      name: 'Emma Wilson',
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      isVerified: false,
    },
    distance: 1200,
    createdAt: new Date(Date.now() - 86400000),
    visibilityRadius: 5000,
    commentCount: 3,
  },
];

const CATEGORIES: PostCategory[] = ['lostFound', 'marketplace', 'safety', 'event', 'general'];

export default function HomeScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-3 bg-white border-b border-neutral-200">
        <View className="flex-row items-center justify-between mb-3">
          <Avatar name="John Doe" size="md" verified={true} />
          <Text className="text-xl font-[Poppins_700Bold] text-neutral-900 flex-1 ml-3">
            {t('feed.title')}
          </Text>
          <TouchableOpacity className="w-10 h-10 items-center justify-center mr-2">
            <Bell color="#212121" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className="w-10 h-10 items-center justify-center"
          >
            <Filter color={showFilters ? "#4CAF50" : "#212121"} size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-background rounded-full px-4 py-2.5 border border-neutral-200">
          <Search color="#9E9E9E" size={20} />
          <TextInput
            className="flex-1 ml-2 font-[Inter_400Regular] text-neutral-900"
            placeholder={t('common.search')}
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {showFilters && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 -mx-1">
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              className={`mx-1 px-4 py-2 rounded-full ${!selectedCategory ? 'bg-neutral-900' : 'bg-neutral-100'}`}
            >
              <Text className={`text-sm font-[Inter_600SemiBold] ${!selectedCategory ? 'text-white' : 'text-neutral-700'}`}>
                All
              </Text>
            </TouchableOpacity>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className="mx-1 px-4 py-2 rounded-full"
                style={{
                  backgroundColor: selectedCategory === category
                    ? CATEGORY_COLORS[category]
                    : CATEGORY_COLORS[category] + '20'
                }}
              >
                <Text
                  className="text-sm font-[Inter_600SemiBold]"
                  style={{
                    color: selectedCategory === category ? '#FFFFFF' : CATEGORY_COLORS[category]
                  }}
                >
                  {t(`post.categories.${category}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {filteredPosts.length > 0 && (
        <View className="px-4 pt-3 pb-2 bg-white border-b border-neutral-100">
          <View className="flex-row items-center">
            <TrendingUp color="#4CAF50" size={18} />
            <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700 ml-2">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} near you
            </Text>
          </View>
        </View>
      )}

      <View className="flex-1 px-4 pt-3">
        <FlatList
          data={filteredPosts}
          renderItem={({ item }) => <FeedCard post={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Search color="#BDBDBD" size={48} />
              <Text className="text-base font-[Inter_600SemiBold] text-neutral-700 mt-4">
                {searchQuery || selectedCategory ? 'No posts found' : t('feed.noPost')}
              </Text>
              <Text className="text-sm font-[Inter_400Regular] text-neutral-500 mt-1 text-center px-8">
                {searchQuery || selectedCategory
                  ? 'Try adjusting your filters or search terms'
                  : 'Be the first to share something with your neighborhood'}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
