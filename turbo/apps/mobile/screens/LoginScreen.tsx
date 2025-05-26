import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('Signup');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl text-red-500 font-bold mb-5">Login画面</Text>
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-md"
        onPress={handleNavigateToHome}
      >
        <Text className="text-white">ホーム画面へ</Text>
      </TouchableOpacity>
    </View>
  );
};