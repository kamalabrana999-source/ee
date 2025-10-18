export type PostCategory = 'lostFound' | 'marketplace' | 'safety' | 'event' | 'general';

export interface Post {
  id: string;
  title: string;
  description: string;
  category: PostCategory;
  imageUrl?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  distance: number;
  createdAt: Date;
  visibilityRadius: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isVerified: boolean;
  location: {
    latitude: number;
    longitude: number;
    neighbourhood: string;
  };
  stats: {
    postsThisWeek: number;
    neighboursHelped: number;
  };
}

export interface CreatePostData {
  title: string;
  description: string;
  category: PostCategory;
  imageUri?: string;
  visibilityRadius: number;
}
