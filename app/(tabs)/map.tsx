import { View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Post } from '../../types';
import { CATEGORY_COLORS } from '../../constants/categories';
import { X, MapPin } from 'lucide-react-native';
import { Avatar } from '../../components/ui/Avatar';
import { CategoryTag } from '../../components/ui/CategoryTag';

let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;

if (Platform.OS !== 'web') {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
  PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Lost Golden Retriever',
    description: 'My dog went missing near the park yesterday evening.',
    category: 'lostFound',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Central Park',
    },
    author: {
      id: 'user1',
      name: 'Sarah Johnson',
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
    description: 'Join us for a community BBQ at the park pavilion.',
    category: 'event',
    location: {
      latitude: 37.7759,
      longitude: -122.4184,
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
    description: 'Selling a barely used mountain bike.',
    category: 'marketplace',
    location: {
      latitude: 37.7739,
      longitude: -122.4204,
      address: 'Oak Street',
    },
    author: {
      id: 'user3',
      name: 'Emma Wilson',
      isVerified: false,
    },
    distance: 1200,
    createdAt: new Date(Date.now() - 86400000),
    visibilityRadius: 5000,
    commentCount: 3,
  },
];

export default function MapScreen() {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-3 bg-white border-b border-neutral-200">
        <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
          {t('map.title')}
        </Text>
      </View>

      <View className="flex-1">
        {Platform.OS === 'web' ? (
          <ScrollView className="flex-1 bg-background">
            <View className="p-4">
              <View className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
                <MapPin color="#2196F3" size={32} />
                <Text className="text-lg font-[Poppins_600SemiBold] text-neutral-900 mt-2">
                  Interactive Map View
                </Text>
                <Text className="text-sm font-[Inter_400Regular] text-neutral-600 mt-1">
                  Map functionality is available on mobile devices. Browse nearby posts below.
                </Text>
              </View>

              {MOCK_POSTS.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  onPress={() => setSelectedPost(post)}
                  className="bg-white rounded-xl p-4 mb-3 border border-neutral-200"
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <CategoryTag category={post.category} />
                    <View className="flex-row items-center">
                      <MapPin color="#9E9E9E" size={14} />
                      <Text className="text-xs font-[Inter_500Medium] text-neutral-500 ml-1">
                        {post.distance}m away
                      </Text>
                    </View>
                  </View>
                  <Text className="text-base font-[Poppins_600SemiBold] text-neutral-900 mt-1">
                    {post.title}
                  </Text>
                  <Text className="text-sm font-[Inter_400Regular] text-neutral-600 mt-1">
                    {post.location.address}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            className="flex-1"
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {MOCK_POSTS.map((post) => (
              <Marker
                key={post.id}
                coordinate={{
                  latitude: post.location.latitude,
                  longitude: post.location.longitude,
                }}
                pinColor={CATEGORY_COLORS[post.category]}
                onPress={() => setSelectedPost(post)}
              />
            ))}
          </MapView>
        )}

        {selectedPost && (
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 shadow-lg">
            <View className="flex-row items-start justify-between mb-2">
              <View className="flex-1">
                <CategoryTag category={selectedPost.category} />
                <Text className="text-lg font-[Poppins_600SemiBold] text-neutral-900 mt-2">
                  {selectedPost.title}
                </Text>
                <Text className="text-sm font-[Inter_400Regular] text-neutral-600 mt-1" numberOfLines={2}>
                  {selectedPost.description}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedPost(null)}
                className="w-8 h-8 items-center justify-center"
              >
                <X color="#212121" size={20} />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mt-2">
              <Avatar
                imageUrl={selectedPost.author.avatarUrl}
                name={selectedPost.author.name}
                size="sm"
                verified={selectedPost.author.isVerified}
              />
              <Text className="text-sm font-[Inter_500Medium] text-neutral-700 ml-2">
                {selectedPost.author.name}
              </Text>
            </View>

            <TouchableOpacity className="bg-primary rounded-full py-3 mt-3">
              <Text className="text-white font-[Poppins_600SemiBold] text-center">
                {t('map.viewDetails')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
