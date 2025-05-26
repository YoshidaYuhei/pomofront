import { useState } from 'react';
import { post, getDeviceHeaders } from '../lib/apiClient';
import { setAccessToken } from '../lib/storage';

export type SignupRequest = {
  email: string;
  password: string;
}

export type SignupResponse = {
  access_token: string;
}

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

      // アクセストークンを保存
      if (result.access_token) {
        await setAccessToken(result.access_token);
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