
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: number;
  username: string;
  password?: string; // Should not be stored in client state in a real app
  role: Role;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  date: string;
}

export type Page = 'news' | 'chat' | 'admin';
