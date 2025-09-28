import type { User, NewsItem } from './types';
import { Role } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', password: 'admin', role: Role.ADMIN },
  { id: 2, username: 'user1', password: 'user1password', role: Role.USER },
  { id: 3, username: 'user2', password: 'user2password', role: Role.USER },
];

export const INITIAL_NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: 'Welcome to Qwen AI Chat!',
    content: 'This is a brand new, intelligent chatbot designed to provide a unique and engaging user experience. Explore the features and start a conversation today.',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    author: 'Admin',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
  },
  {
    id: 2,
    title: 'New Feature: Chat History',
    content: 'Your conversations are now saved for the duration of your session. You can scroll up to see previous messages anytime.',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    author: 'Admin',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
  },
];
