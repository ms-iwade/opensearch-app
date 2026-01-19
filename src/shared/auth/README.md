# Shared Auth

AWS Amplify認証を使用したアプリケーション全体の認証管理システムです。

## 構成

```
src/shared/auth/
├── index.ts           # エクスポートをまとめる
├── types.ts           # 型定義とコンテキスト
├── AuthProvider.tsx   # 認証プロバイダーコンポーネント
├── useAuth.ts         # 認証フック
└── README.md          # このファイル
```

## 使用方法

### 基本的な使用方法

```typescript
import { useAuth } from '@shared/auth';

const MyComponent = () => {
  const { userInfo, isLoading, error, logout, refreshUserInfo } = useAuth();

  if (isLoading) {
    return <div>認証情報を読み込み中...</div>;
  }

  if (!userInfo.isAuthenticated) {
    return <div>ログインが必要です</div>;
  }

  return (
    <div>
      <p>ようこそ、{userInfo.username}さん</p>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};
```

### プロバイダーの設定

`AuthProvider`は`src/app/providers.tsx`で設定済みです：

```typescript
import { AuthProvider } from '@shared/auth';

export const Providers = ({ children }) => {
  return (
    <Authenticator>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Authenticator>
  );
};
```

## API

### useAuth()

認証情報と操作を提供するカスタムフックです。

#### 戻り値

| プロパティ | 型 | 説明 |
|-----------|----|----|
| `userInfo` | `UserInfo` | ユーザー情報オブジェクト |
| `isLoading` | `boolean` | 認証情報の読み込み状態 |
| `error` | `string \| null` | エラーメッセージ |
| `logout` | `() => Promise<void>` | ログアウト関数 |
| `refreshUserInfo` | `() => Promise<void>` | 認証情報の再取得関数 |

### UserInfo

```typescript
interface UserInfo {
  isAuthenticated: boolean;
  username?: string;
  userId?: string;
  identityId?: string;
  groups?: string[];
}
```

## 特徴

- **型安全性**: TypeScriptで完全に型付けされています
- **エラーハンドリング**: 認証エラーを適切に処理します
- **Fast Refresh対応**: 開発時のホットリロードに対応しています
- **統一されたAPI**: アプリケーション全体で一貫した認証情報アクセス

## 注意事項

- `useAuth`は`AuthProvider`内でのみ使用できます
- 認証状態の変更は自動的に全コンポーネントに反映されます
- ログアウト時は自動的に認証情報がクリアされます

## 例

### 条件付きレンダリング

```typescript
const ProtectedComponent = () => {
  const { userInfo } = useAuth();

  return userInfo.isAuthenticated ? (
    <AdminPanel />
  ) : (
    <LoginPrompt />
  );
};
```

### ユーザー情報の表示

```typescript
const UserProfile = () => {
  const { userInfo } = useAuth();

  return (
    <div>
      <h2>プロフィール</h2>
      <p>ユーザー名: {userInfo.username}</p>
      <p>ユーザーID: {userInfo.userId}</p>
      <p>グループ: {userInfo.groups?.join(', ') || 'なし'}</p>
    </div>
  );
};
```

### エラーハンドリング

```typescript
const AuthAwareComponent = () => {
  const { userInfo, error, refreshUserInfo } = useAuth();

  if (error) {
    return (
      <div>
        <p>エラー: {error}</p>
        <button onClick={refreshUserInfo}>再試行</button>
      </div>
    );
  }

  // 通常の処理...
};
``` 