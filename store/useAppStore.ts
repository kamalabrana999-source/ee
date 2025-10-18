import { create } from 'zustand';
import { User, Post } from '../types';

interface AppState {
  user: User | null;
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  selectedLanguage: string;
  isDarkMode: boolean;
  setUser: (user: User | null) => void;
  setCurrentLocation: (location: { latitude: number; longitude: number } | null) => void;
  setSelectedLanguage: (language: string) => void;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  currentLocation: null,
  selectedLanguage: 'en',
  isDarkMode: false,
  setUser: (user) => set({ user }),
  setCurrentLocation: (location) => set({ currentLocation: location }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
