// services/ApiClient.ts
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://localhost:3000';
const ACCESS_TOKEN_KEY = 'access_token';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Os-Type': 'ios',
};

// アクセストークンを取得する関数
async function getAuthHeaders(): Promise<HeadersInit> {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (!token) return defaultHeaders;

    return {
      ...defaultHeaders,
      'Authorization': `Bearer ${token}`,
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return defaultHeaders;
  }
}

// 共通のHTTPリクエストメソッド
async function request<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  // 認証ヘッダーを取得
  const authHeaders = await getAuthHeaders();
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // JSON parse error の場合はデフォルトメッセージを使用
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
}

// GET リクエスト
export async function get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
  return request<T>(endpoint, {
    method: 'GET',
    headers,
  });
}

// POST リクエスト
export async function post<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
}

// PUT リクエスト
export async function put<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
  return request<T>(endpoint, {
    method: 'PUT',
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
}

// PATCH リクエスト
export async function patch<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
  return request<T>(endpoint, {
    method: 'PATCH',
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
}

// DELETE リクエスト
export async function del<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
  return request<T>(endpoint, {
    method: 'DELETE',
    headers,
  });
}

// デバイスID付きヘッダーを取得
export function getDeviceHeaders(deviceId: string): HeadersInit {
  return {
    ...defaultHeaders,
    'X-Device-ID': deviceId,
  };
}

// 認証 + デバイスID付きヘッダーを取得
export async function getAuthDeviceHeaders(deviceId: string): Promise<HeadersInit> {
  const authHeaders = await getAuthHeaders();
  return {
    ...authHeaders,
    'X-Device-ID': deviceId,
  };
}