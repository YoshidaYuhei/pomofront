import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator,
  Platform, KeyboardAvoidingView, 
  ScrollView, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLogin } from '../hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const { height } = Dimensions.get('window');

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, login, clearError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  // バリデーション
  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 8;

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      console.log('Login result:', result);
      // ログイン成功時にホーム画面に遷移
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          minHeight: height,
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center py-12">
          {/* ヘッダー部分 */}
          <View className="mb-12 items-center">
            <View className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl items-center justify-center mb-6 shadow-lg">
              <Text className="text-white text-3xl">🔑</Text>
            </View>
            <Text className="text-4xl font-bold text-gray-800 mb-2">ログイン</Text>
            <Text className="text-gray-500 text-center">
              アカウントにログインして、作業を始めましょう
            </Text>
          </View>

          {/* フォーム部分 */}
          <View className="space-y-6 mb-8">
            {/* メールアドレス入力フォーム */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">メールアドレス</Text>
              <TextInput
                className={`bg-gray-50 border rounded-xl p-4 text-base ${
                  email.length > 0 && !isEmailValid ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="メールアドレスを入力してください"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {email.length > 0 && !isEmailValid && (
                <Text className="text-red-500 text-sm mt-2">
                  メールアドレスの形式が正しくありません
                </Text>
              )}
            </View>

            {/* パスワード入力フォーム */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">パスワード</Text>
              <View className="relative">
                <TextInput
                  className={`bg-gray-50 border rounded-xl p-4 text-base ${
                    password.length > 0 && !isPasswordValid ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="パスワードを入力してください"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text className="text-blue-500 font-medium">
                    {showPassword ? '非表示' : '表示'}
                  </Text>
                </TouchableOpacity>
              </View>
              {password.length > 0 && !isPasswordValid && (
                <Text className="text-red-500 text-sm mt-2">
                  パスワードは8文字以上で入力してください
                </Text>
              )}
            </View>
          </View>

          {/* エラーメッセージ */}
          {error && (
            <View className="bg-red-50 p-4 rounded-xl mb-6">
              <Text className="text-red-500 text-sm text-center">
                {error}
              </Text>
            </View>
          )}

          {/* ログインボタン */}
          <TouchableOpacity
            className={`bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 mb-8 shadow-lg ${
              !isEmailValid || !isPasswordValid || loading ? 'opacity-50' : ''
            }`}
            onPress={handleLogin}
            disabled={!isEmailValid || !isPasswordValid || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                ログイン
              </Text>
            )}
          </TouchableOpacity>

          {/* フッター */}
          <View className="items-center">
            <Text className="text-gray-500 mb-2">まだアカウントがない方</Text>
            <TouchableOpacity 
              className="bg-gray-50 px-6 py-3 rounded-full"
              onPress={navigateToSignup}
            >
              <Text className="text-blue-500 font-semibold">
                アカウント作成
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}