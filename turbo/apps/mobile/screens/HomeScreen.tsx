import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl text-red-500 font-bold mb-5">Home</Text>
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-md"
        onPress={handleNavigateToLogin}
      >
        <Text className="text-white">ログイン画面へ</Text>
      </TouchableOpacity>
    </View>
  );
};