import './global.css';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">Open up App.tsx to start working on your app!</Text>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <StatusBar style="auto" />
    </View>
  );
}
;
