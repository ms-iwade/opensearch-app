# Shared Loading

アプリケーション全体のローディング状態を統一的に管理するシステムです。

## 構成

```
src/shared/loading/
├── index.ts              # エクスポートをまとめる
├── types.ts              # 型定義とコンテキスト
├── LoadingSpinner.tsx    # 共通ローディングコンポーネント
├── LoadingProvider.tsx   # ローディングプロバイダー
├── useLoading.ts         # ローディングフック
└── README.md             # このファイル
```

## 使用方法

### 基本的な使用方法

```typescript
import { useLoading, LoadingSpinner } from '@shared/loading';

const MyComponent = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [localLoading, setLocalLoading] = useState(false);

  const handleAsyncOperation = async () => {
    // フルスクリーンローディング
    startLoading({ fullScreen: true, message: 'データを読み込み中...' });
    try {
      await someAsyncOperation();
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      {/* ローカルローディング */}
      <LoadingSpinner 
        loading={localLoading} 
        size="small" 
        message="処理中..." 
      />
      
      <button onClick={handleAsyncOperation}>
        データ読み込み
      </button>
    </div>
  );
};
```

### プロバイダーの設定

`LoadingProvider`を`src/app/providers.tsx`に追加：

```typescript
import { LoadingProvider } from '@shared/loading';

export const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};
```

## API

### useLoading()

グローバルローディング状態を管理するカスタムフックです。

#### 戻り値

| プロパティ | 型 | 説明 |
|-----------|----|----|
| `isLoading` | `boolean` | グローバルローディング状態 |
| `startLoading` | `(options?: LoadingOptions) => void` | ローディング開始 |
| `stopLoading` | `() => void` | ローディング終了 |
| `options` | `LoadingOptions` | 現在のローディングオプション |

### LoadingSpinner

ローディングUIを表示するコンポーネントです。

#### Props

| プロパティ | 型 | デフォルト | 説明 |
|-----------|----|---------|----|
| `loading` | `boolean` | `true` | ローディング状態 |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | スピナーサイズ |
| `minHeight` | `string` | `"200px"` | 最小高さ |
| `message` | `string` | - | 表示メッセージ |
| `fullScreen` | `boolean` | `false` | フルスクリーン表示 |
| `overlay` | `boolean` | `false` | オーバーレイ表示 |

## 使用パターン

### 1. ページレベルローディング

```typescript
// router.tsx
import { LoadingSpinner } from '@shared/loading';

const LoadingFallback = () => (
  <LoadingSpinner size="medium" message="ページを読み込み中..." />
);
```

### 2. フルスクリーンローディング

```typescript
const App = () => {
  const { startLoading, stopLoading } = useLoading();

  const handleFullScreenAction = async () => {
    startLoading({ 
      fullScreen: true, 
      message: 'データを同期中...' 
    });
    try {
      await syncData();
    } finally {
      stopLoading();
    }
  };
};
```

### 3. オーバーレイローディング

```typescript
const App = () => {
  const { startLoading, stopLoading } = useLoading();

  const handleOverlayAction = async () => {
    startLoading({ 
      overlay: true, 
      message: '保存中...' 
    });
    try {
      await saveData();
    } finally {
      stopLoading();
    }
  };
};
```

### 4. コンポーネント内ローディング

```typescript
const DataList = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <LoadingSpinner 
        loading={loading} 
        size="small"
        minHeight="100px"
      />
      {/* データリスト */}
    </div>
  );
};
```

## 特徴

- **統一されたAPI**: アプリケーション全体で一貫したローディング表示
- **柔軟な設定**: サイズ、メッセージ、表示方法を細かく制御可能
- **型安全性**: TypeScriptで完全に型付けされています
- **パフォーマンス**: 必要な時のみレンダリング
- **アクセシビリティ**: MUIのBackdropコンポーネントを使用

## 注意事項

- `useLoading`は`LoadingProvider`内でのみ使用できます
- グローバルローディングは重複して表示されません
- ローカルローディングとグローバルローディングは独立して動作します 