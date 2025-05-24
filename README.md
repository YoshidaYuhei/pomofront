# ar_front

# 手順
## Turbopack から環境構築
npx create-turbo@latest

## Expo + Next.js + Turborepo モノレポ構成テンプレート

### 1. Turborepo プロジェクトを作成
npx create-turbo@latest frontend

### 2. ディレクトリ構成の整理
cd frontend
mkdir -p apps/web apps/mobile packages/ui

### 3. Expo アプリの作成
cd apps
npx create-expo-app mobile --template blank-typescript
cd mobile
npm run ios
npx expo install expo-dev-client react-native-web react-dom react-native-safe-area-context

### 画面遷移
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack

## 注意点
turbopack が用意した node_module を使うこと。
create-expo-app によって node_modules が作成されるがこれは削除する。
turbopack が用意した node_module は expo が期待するバージョンと異なる場合があるので調整
npm でモジュールを追加するときは frontend ディレクトリまで移動すること！
`npm install react@19.0.0 @types/react@~19.0.10 typescript@~5.8.3 --save`

