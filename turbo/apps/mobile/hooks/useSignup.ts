import { useState } from 'react';
import { post, getDeviceHeaders } from '../lib/apiClient';
import * as SecureStore from 'expo-secure-store';

export type SignupRequest = {
  email: string;
  password: string;
}

export type SignupResponse = {
  access_token: string;
}

const ACCESS_TOKEN_KEY = 'access_token';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (email: string, password: string, deviceId?: string) => {
    setLoading(true);
    setError(null);

    try {
      const requestData: SignupRequest = {
        email,
        password,
      };

      console.log('requestData:', requestData);
      const headers = deviceId 
        ? getDeviceHeaders(deviceId)
        : undefined;

      const result = await post<SignupResponse>(
        '/api/v1/users/signup',
        requestData,
        headers,
      );

      // アクセストークンをSecureStoreに保存
      if (result.access_token) {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, result.access_token);
      }

      console.log('Signup success');
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Signup failed:', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  return { loading, error, signup, clearError };
}