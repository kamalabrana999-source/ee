import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../components/ui/Avatar';
import { Conversation } from '../../types';
import { Search, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    participant: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    lastMessage: 'Thanks for the update on Max!',
    lastMessageTime: new Date(Date.now() - 1800000),
    unreadCount: 2,
  },
  {
    id: '2',
    participant: {
      id: 'user2',
      name: 'Mike Chen',
    },
    lastMessage: 'See you at the BBQ on Saturday',
    lastMessageTime: new Date(Date.now() - 7200000),
    unreadCount: 0,
  },
  {
    id: '3',
    participant: {
      id: 'user3',
      name: 'Emma Wilson',
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    lastMessage: 'Is the bike still available?',
    lastMessageTime: new Date(Date.now() - 86400000),
    unreadCount: 1,
  },
];

export default function MessagesScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const filteredConversations = MOCK_CONVERSATIONS.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = MOCK_CONVERSATIONS.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const renderConversation = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-4 bg-white border-b border-neutral-100 ${
        item.unreadCount > 0 ? 'bg-blue-50/30' : ''
      }`}
    >
      <View className="relative">
        <Avatar
          imageUrl={item.participant.avatarUrl}
          name={item.participant.name}
          size="md"
        />
        {item.unreadCount > 0 && (
          <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary items-center justify-center border-2 border-white">
            <Text className="text-xs font-[Inter_700Bold] text-white">
              {item.unreadCount}
            </Text>
          </View>
        )}
      </View>
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text className={`text-base ${item.unreadCount > 0 ? 'font-[Poppins_700Bold]' : 'font-[Poppins_600SemiBold]'} text-neutral-900`}>
            {item.participant.name}
          </Text>
          <Text className={`text-xs ${item.unreadCount > 0 ? 'font-[Inter_600SemiBold] text-primary' : 'font-[Inter_400Regular] text-neutral-500'}`}>
            {formatTime(item.lastMessageTime)}
          </Text>
        </View>
        <Text
          className={`text-sm ${item.unreadCount > 0 ? 'font-[Inter_500Medium] text-neutral-900' : 'font-[Inter_400Regular] text-neutral-600'}`}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-3 bg-white border-b border-neutral-200">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
            {t('messages.title')}
          </Text>
          {totalUnread > 0 && (
            <View className="px-3 py-1 bg-primary rounded-full">
              <Text className="text-xs font-[Inter_700Bold] text-white">
                {totalUnread} new
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center bg-background rounded-full px-4 py-2.5 border border-neutral-200">
          <Search color="#9E9E9E" size={20} />
          <TextInput
            className="flex-1 ml-2 font-[Inter_400Regular] text-neutral-900"
            placeholder="Search conversations..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <MessageCircle color="#BDBDBD" size={48} />
            <Text className="text-base font-[Inter_600SemiBold] text-neutral-700 mt-4">
              {searchQuery ? 'No conversations found' : t('messages.noMessages')}
            </Text>
            <Text className="text-sm font-[Inter_400Regular] text-neutral-500 mt-1 text-center px-8">
              {searchQuery
                ? 'Try a different search term'
                : 'Start connecting with your neighbors by commenting on posts'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
