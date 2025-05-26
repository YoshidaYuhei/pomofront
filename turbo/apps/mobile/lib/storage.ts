import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'access_token';

// Web用のストレージ実装
const webStorage = {
  async getItem(key: string): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  async removeItem(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
};

// プラットフォームに応じたストレージを返す
const storage = Platform.OS === 'web' ? webStorage : SecureStore;

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await storage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const setAccessToken = async (token: string): Promise<void> => {
  try {
    await storage.setItem(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting access token:', error);
  }
};

export const removeAccessToken = async (): Promise<void> => {
  try {
    await storage.removeItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing access token:', error);
  }
}; 