import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator,
  Platform, KeyboardAvoidingView, 
  ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSignup } from '../hooks/useSignup';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export const SignupScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, signup, clearError } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  // バリデーション
  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 8;

  const handleSignup = async () => {
    try {
      const result = await signup(email, password);
      console.log('Signup result:', result);
      // サインアップ成功時にホーム画面に遷移
      navigation.navigate('Home');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1 p-4"
        contentContainerClassName="flex-1 justify-center"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-8">

          {/* ヘッダー部分 */}
          <View className="mb-6">
            <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mx-auto">
              <Text className="text-white text-2xl font-bold">+</Text>
            </View>
            <Text className="text-3xl text-center font-bold text-gray-800 mb-2">アカウント作成</Text>
          </View>

          {/* フォーム部分 */}
          <View className="space-y-4">
            {/* メールアドレス入力フォーム */}
            <View className="mb-4">
              <Text className="text-sm text-gray-500 mb-2">メールアドレス</Text>
              <TextInput
                className={`border border-gray-300 rounded-md p-2" ${
                  email.length > 0 && !isEmailValid ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="メールアドレスを入力してください"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {email.length > 0 && !isEmailValid && (
                <Text className="text-red-500 text-sm mt-1">
                  メールアドレスの形式が正しくありません
                </Text>
              )}
            </View>

            {/* パスワード入力フォーム */}
            <View className="mb-4">
              <Text className="text-sm text-gray-500 mb-2">パスワード</Text>
              <TextInput
                className={`border border-gray-300 rounded-md p-2" ${
                  password.length > 0 && !isPasswordValid ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="8文字以上のパスワード"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity
                className="absolute right-3 top-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text className="text-gray-500 text-sm">
                  {showPassword ? '非表示' : '表示'}
                </Text>
              </TouchableOpacity>
            </View>
            {password.length > 0 && !isPasswordValid && (
              <Text className="text-red-500 text-sm mt-1">
                パスワードは8文字以上で入力してください
              </Text>
            )}
          </View>

          {/* エラーメッセージ */}
          {error && (
            <Text className="text-red-500 text-sm mt-2 text-center">
              {error}
            </Text>
          )}

          {/* 利用規約 */}
          <View className="mb-4">
            <Text className="text-sm text-gray-500 mb-2">
              アカウントを作成することで、
              <Text className="text-blue-500">利用規約</Text>
              および
              <Text className="text-blue-500">プライバシーポリシー</Text>
              に同意したものとみなされます。
            </Text>
          </View>

          {/* 新規登録ボタン */}
          <TouchableOpacity
            className={`bg-green-500 rounded-md p-3 ${
              !isEmailValid || !isPasswordValid || loading ? 'opacity-50' : ''
            }`}
            onPress={handleSignup}
            disabled={!isEmailValid || !isPasswordValid || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold">新規登録</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {/*フッター*/}
        <View className="mt-8 items-center">
          <Text className="text-gray-600">既にアカウントをお持ちの方</Text>
          <TouchableOpacity className="mt-2" onPress={navigateToLogin}>
            <Text className="text-blue-500 font-semibold">ログイン</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  )
}