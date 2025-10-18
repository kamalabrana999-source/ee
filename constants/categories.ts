import { PostCategory } from '../types';

export const CATEGORY_COLORS: Record<PostCategory, string> = {
  lostFound: '#FF6B6B',
  marketplace: '#4ECDC4',
  safety: '#FFA502',
  event: '#A29BFE',
  general: '#4CAF50',
};

export const CATEGORY_ICONS: Record<PostCategory, string> = {
  lostFound: 'search',
  marketplace: 'shopping-bag',
  safety: 'alert-triangle',
  event: 'calendar',
  general: 'message-circle',
};
