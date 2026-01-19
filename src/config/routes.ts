import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import type { ComponentType } from "react";

/**
 * ルート設定の型定義
 */
export interface RouteConfig {
  /** ルートのパス */
  path: string;

  /** コンポーネントの動的インポート関数 */
  loader?: () => Promise<{ default: ComponentType }>;

  /** ページ表示前のデータ取得処理 */
  dataLoader?: (args: LoaderFunctionArgs) => Promise<unknown>;

  /** フォーム送信などのアクション処理 */
  action?: (args: ActionFunctionArgs) => Promise<Response | null | undefined>;

  /** 認証が必要かどうか */
  requiresAuth?: boolean;

  /** パンくずリスト設定 */
  breadcrumb?: {
    parent?: string; // 親ルートのキー
    label: string;
  };
}

/**
 * ルート設定
 *
 * 各ページのルーティング設定を定義します。
 * ナビゲーション表示やアイコンなどのUI関連設定は sideMenu.tsx で管理します。
 * 新しいページを追加する場合は、ここに設定を追加してください。
 */
export const routeConfigs: Record<string, RouteConfig> = {
  home: {
    path: "/",
    loader: () => import("@features/home/Home"),
    breadcrumb: {
      label: "ホーム",
    },
  },

  // ========================================
  // ルート設定例（コメントアウト）
  // ========================================

  // 基本的なページ設定例
  // dashboard: {
  //   path: "/dashboard",
  //   loader: () => import("@features/dashboard/Dashboard"),
  //   breadcrumb: {
  //     label: "ダッシュボード",
  //   },
  // },

  // 認証が必要なページの例
  // users: {
  //   path: "/users",
  //   loader: () => import("@features/users/Users"),
  //   requiresAuth: true,
  //   breadcrumb: {
  //     label: "ユーザー管理",
  //   },
  // },

  // データローダー付きページの例
  // profile: {
  //   path: "/profile",
  //   loader: () => import("@features/profile/Profile"),
  //   dataLoader: async ({ params }) => {
  //     // ページ表示前にユーザーデータを取得
  //     const response = await fetch(`/api/users/${params.userId}`);
  //     return response.json();
  //   },
  //   requiresAuth: true,
  //   breadcrumb: {
  //     label: "プロフィール",
  //   },
  // },

  // アクション付きページの例（フォーム処理など）
  // settings: {
  //   path: "/settings",
  //   loader: () => import("@features/settings/Settings"),
  //   action: async ({ request }) => {
  //     // フォーム送信時の処理
  //     const formData = await request.formData();
  //     const response = await fetch('/api/settings', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     return response;
  //   },
  //   requiresAuth: true,
  //   breadcrumb: {
  //     label: "設定",
  //   },
  // },

  // ナビゲーションに表示しないページの例
  // help: {
  //   path: "/help",
  //   loader: () => import("@features/help/Help"),
  //   breadcrumb: {
  //     label: "ヘルプ",
  //   },
  // },

  // 階層パンくずリストの例
  // userDetail: {
  //   path: "/users/:id",
  //   loader: () => import("@features/users/UserDetail"),
  //   requiresAuth: true,
  //   breadcrumb: {
  //     parent: "users", // 親ページのキーを指定
  //     label: "ユーザー詳細",
  //   },
  // },
};

/**
 * ルートパスの定数（必要に応じて使用）
 *
 * TypeScriptの型安全性を保ちたい場合や、
 * 他のファイルでパスを参照したい場合に使用できます。
 */
export const ROUTES = {
  HOME: routeConfigs.home.path,
  // 他のルートを追加する場合の例：
  // DASHBOARD: routeConfigs.dashboard.path,
  // USERS: routeConfigs.users.path,
} as const;

/**
 * パスからルート設定を取得
 */
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return Object.values(routeConfigs).find((config) => config.path === path);
};

/**
 * ルートキーからルート設定を取得
 */
export const getRouteConfigByKey = (key: string): RouteConfig | undefined => {
  return routeConfigs[key];
};

/**
 * パンくずリストを生成
 *
 * @param routeKey - ルートキー
 * @returns パンくずリストの配列
 */
export const getBreadcrumbs = (routeKey: string): RouteConfig[] => {
  const route = routeConfigs[routeKey];
  if (!route?.breadcrumb) return [];

  const breadcrumbs: RouteConfig[] = [];

  // 親ページがある場合は再帰的に取得
  if (route.breadcrumb.parent) {
    breadcrumbs.push(...getBreadcrumbs(route.breadcrumb.parent));
  }

  breadcrumbs.push(route);
  return breadcrumbs;
};

/**
 * 認証が必要なルートを取得
 */
export const getAuthRequiredRoutes = (): RouteConfig[] => {
  return Object.values(routeConfigs).filter((config) => config.requiresAuth);
};

// ========================================
// 使用方法の説明
// ========================================

/**
 * 新しいページを追加する手順：
 *
 * 1. routeConfigsに新しい設定を追加
 *    例:
 *    dashboard: {
 *      path: "/dashboard",
 *      loader: () => import("@features/dashboard/Dashboard"),
 *      breadcrumb: { label: "ダッシュボード" },
 *    },
 *
 * 2. 対応するコンポーネントファイルを作成
 *    例: src/features/dashboard/Dashboard.tsx
 *
 * 3. sideMenu.tsxにメニューアイテムを追加（ナビゲーションに表示する場合）
 *    例:
 *    {
 *      id: 'dashboard',
 *      label: 'ダッシュボード',
 *      path: '/dashboard',
 *      icon: DashboardOutlined,
 *    }
 *
 * 4. 型安全性が必要な場合はROUTESにパスを追加
 *    例: DASHBOARD: routeConfigs.dashboard.path,
 *
 * 注意事項：
 * - loaderは必須です（コンポーネントの動的インポート用）
 * - ナビゲーション表示設定はsideMenu.tsxで管理します
 * - requiresAuthをtrueにすると認証が必要なページになります
 * - パンくずリストはbreadcrumbプロパティで設定します
 */
