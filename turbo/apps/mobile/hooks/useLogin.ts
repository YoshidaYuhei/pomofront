import { useState } from 'react';
import { post, getDeviceHeaders } from '../lib/apiClient';
import { setAccessToken } from '../lib/storage';

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  access_token: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, deviceId?: string) => {
    setLoading(true);
    setError(null);

    try {
      const requestData: LoginRequest = {
        email,
        password,
      };

      console.log('requestData:', requestData);
      const headers = deviceId 
        ? getDeviceHeaders(deviceId)
        : undefined;

      const result = await post<LoginResponse>(
        '/api/v1/users/login',
        requestData,
        headers,
      );

      // アクセストークンを保存
      if (result.access_token) {
        await setAccessToken(result.access_token);
      }

      console.log('Login success');
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Login failed:', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  return { loading, error, login, clearError };
}