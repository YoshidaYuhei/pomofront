import './global.css';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Os-Type': 'ios',
    };
  }

  async healthCheck(): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/api/v1/health_checks`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}
export default function App() {
  const [apiClient] = useState(() => new ApiClient());
  const [healthStatus, setHealthStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const checkHealth = async () => {
    setLoading(true);
    setError('')
    try {
      const response = await apiClient.healthCheck();
      setHealthStatus(response.message)
      console.log(response)
      setLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl text-red-500 font-bold mb-5">Rails API Health Check</Text>
      <View className="md-5 w-full max-w-xs">
        <Button
          title={loading ? 'Loading...' : 'Check Health'}
          onPress={checkHealth}
          disabled={loading} />
      </View>
      {healthStatus && (
        <View className="p-3 mb-5 bg-green-100 rounded-lg">
          <Text className="text-sm text-green-700">{healthStatus}</Text>
        </View>
      )}
      {error && (
        <View className="p-3 mb-5 bg-red-100 rounded-lg">
          <Text className="text-sm text-red-700">{error}</Text>
        </View>
      )}
    </View>
  );
}
;
