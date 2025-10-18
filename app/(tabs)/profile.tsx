import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../components/ui/Avatar';
import { Settings, Edit3, LogOut, Award, TrendingUp, MapPin, Heart, MessageCircle, Bell, Shield } from 'lucide-react-native';

export default function ProfileScreen() {
  const { t } = useTranslation();

  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    isVerified: true,
    neighbourhood: 'Downtown District',
    memberSince: 'March 2024',
    stats: {
      postsThisWeek: 5,
      neighboursHelped: 23,
      totalPosts: 42,
      responseRate: 95,
    },
  };

  const recentActivity = [
    { id: '1', type: 'post', title: 'Lost Golden Retriever', action: 'Posted', time: '2h ago' },
    { id: '2', type: 'comment', title: 'Neighbourhood BBQ', action: 'Commented on', time: '5h ago' },
    { id: '3', type: 'like', title: 'Bicycle for Sale', action: 'Liked', time: '1d ago' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-3 bg-white border-b border-neutral-200 flex-row items-center justify-between">
        <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
          {t('profile.title')}
        </Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Settings color="#212121" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white pt-6 pb-4 items-center border-b border-neutral-200">
          <Avatar
            imageUrl={mockUser.avatarUrl}
            name={mockUser.name}
            size="lg"
            verified={mockUser.isVerified}
          />
          <Text className="text-2xl font-[Poppins_700Bold] text-neutral-900 mt-3">
            {mockUser.name}
          </Text>
          <View className="flex-row items-center mt-1">
            <MapPin color="#9E9E9E" size={14} />
            <Text className="text-sm font-[Inter_400Regular] text-neutral-600 ml-1">
              {mockUser.neighbourhood}
            </Text>
          </View>
          <Text className="text-xs font-[Inter_400Regular] text-neutral-500 mt-1">
            Member since {mockUser.memberSince}
          </Text>
          {mockUser.isVerified && (
            <View className="flex-row items-center mt-3 px-3 py-1.5 bg-accent/10 rounded-full">
              <Award color="#FFB000" size={16} />
              <Text className="text-sm font-[Inter_600SemiBold] text-accent ml-1">
                {t('profile.verifiedLocal')}
              </Text>
            </View>
          )}
        </View>

        <View className="bg-white mx-4 my-4 rounded-2xl p-4 shadow-sm">
          <View className="flex-row flex-wrap">
            <View className="w-1/2 items-center py-3 border-r border-b border-neutral-100">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-2">
                <TrendingUp color="#4CAF50" size={20} />
              </View>
              <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
                {mockUser.stats.postsThisWeek}
              </Text>
              <Text className="text-xs font-[Inter_500Medium] text-neutral-600 mt-1 text-center">
                This Week
              </Text>
            </View>

            <View className="w-1/2 items-center py-3 border-b border-neutral-100">
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-2">
                <MessageCircle color="#2196F3" size={20} />
              </View>
              <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
                {mockUser.stats.totalPosts}
              </Text>
              <Text className="text-xs font-[Inter_500Medium] text-neutral-600 mt-1 text-center">
                Total Posts
              </Text>
            </View>

            <View className="w-1/2 items-center py-3 border-r border-neutral-100">
              <View className="w-12 h-12 bg-accent/10 rounded-full items-center justify-center mb-2">
                <Award color="#FFB000" size={20} />
              </View>
              <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
                {mockUser.stats.neighboursHelped}
              </Text>
              <Text className="text-xs font-[Inter_500Medium] text-neutral-600 mt-1 text-center">
                Helped
              </Text>
            </View>

            <View className="w-1/2 items-center py-3">
              <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center mb-2">
                <Shield color="#4CAF50" size={20} />
              </View>
              <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
                {mockUser.stats.responseRate}%
              </Text>
              <Text className="text-xs font-[Inter_500Medium] text-neutral-600 mt-1 text-center">
                Response
              </Text>
            </View>
          </View>
        </View>

        <View className="mx-4 mb-4">
          <Text className="text-lg font-[Poppins_600SemiBold] text-neutral-900 mb-3">
            Recent Activity
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden">
            {recentActivity.map((activity, index) => (
              <TouchableOpacity
                key={activity.id}
                className={`flex-row items-center px-4 py-3 ${
                  index !== recentActivity.length - 1 ? 'border-b border-neutral-100' : ''
                }`}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    activity.type === 'post'
                      ? 'bg-primary/10'
                      : activity.type === 'comment'
                      ? 'bg-blue-50'
                      : 'bg-red-50'
                  }`}
                >
                  {activity.type === 'post' ? (
                    <MessageCircle color="#4CAF50" size={18} />
                  ) : activity.type === 'comment' ? (
                    <MessageCircle color="#2196F3" size={18} />
                  ) : (
                    <Heart color="#FF6B6B" size={18} />
                  )}
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-[Inter_500Medium] text-neutral-900">
                    {activity.action} <Text className="font-[Inter_400Regular]">{activity.title}</Text>
                  </Text>
                  <Text className="text-xs font-[Inter_400Regular] text-neutral-500 mt-0.5">
                    {activity.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="bg-white mx-4 rounded-2xl overflow-hidden mb-4">
          <TouchableOpacity className="flex-row items-center px-4 py-4 border-b border-neutral-100">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
              <Edit3 color="#4CAF50" size={20} />
            </View>
            <Text className="text-base font-[Inter_500Medium] text-neutral-900 ml-3 flex-1">
              {t('profile.editProfile')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-4 py-4 border-b border-neutral-100">
            <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
              <Bell color="#2196F3" size={20} />
            </View>
            <Text className="text-base font-[Inter_500Medium] text-neutral-900 ml-3 flex-1">
              Notifications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-4 py-4 border-b border-neutral-100">
            <View className="w-10 h-10 bg-neutral-100 rounded-full items-center justify-center">
              <Settings color="#616161" size={20} />
            </View>
            <Text className="text-base font-[Inter_500Medium] text-neutral-900 ml-3 flex-1">
              {t('profile.settings')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-4 py-4">
            <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center">
              <LogOut color="#FF6B6B" size={20} />
            </View>
            <Text className="text-base font-[Inter_500Medium] text-red-500 ml-3 flex-1">
              {t('profile.logout')}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
