import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import type { SvgIconComponent } from '@mui/icons-material';

/**
 * ナビゲーション表示場所の型定義
 */
export type NavigationPlacement = 'sidebar' | 'bottom' | 'header' | 'all';

/**
 * ナビゲーションアイテムの型定義
 */
export interface NavigationItemType {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
  disabled?: boolean;
  badge?: {
    count: number;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  };
  children?: NavigationItemType[];
  placement: NavigationPlacement[]; // どのナビゲーションに表示するか
  order?: number; // 表示順序（小さい順）
}

/**
 * アプリケーションのナビゲーション設定
 * 
 * サイドメニュー、ボトムナビゲーション、ヘッダーメニューなど
 * 複数のナビゲーション要素で共通のメニュー設定を管理します。
 */
export const navigationItems: NavigationItemType[] = [
  {
    id: 'home',
    label: 'ホーム',
    path: '/',
    icon: HomeOutlinedIcon,
    placement: ['sidebar', 'bottom'], // サイドメニューとボトムナビの両方に表示
    order: 1,
  }

  // ========================================
  // ナビゲーション設定例
  // ========================================
  
  // サイドメニューのみに表示
  // {
  //   id: 'dashboard',
  //   label: 'ダッシュボード',
  //   path: '/dashboard',
  //   icon: DashboardOutlined, // import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
  //   placement: ['sidebar'],
  //   order: 2,
  // },

  // ボトムナビゲーションのみに表示
  // {
  //   id: 'favorites',
  //   label: 'お気に入り',
  //   path: '/favorites',
  //   icon: FavoriteOutlined, // import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
  //   placement: ['bottom'],
  //   order: 2,
  // },

  // 全てのナビゲーションに表示
  // {
  //   id: 'profile',
  //   label: 'プロフィール',
  //   path: '/profile',
  //   icon: PersonOutlined, // import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
  //   placement: ['all'],
  //   order: 99,
  // },

  // バッジ付きナビゲーションアイテム例
  // {
  //   id: 'notifications',
  //   label: '通知',
  //   path: '/notifications',
  //   icon: NotificationsOutlined, // import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
  //   placement: ['sidebar', 'header'],
  //   badge: {
  //     count: 12,
  //     color: 'error',
  //   },
  //   order: 10,
  // },

  // 階層メニューアイテム例（主にサイドメニュー用）
  // {
  //   id: 'management',
  //   label: '管理',
  //   path: '/management',
  //   icon: SettingsOutlined, // import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
  //   placement: ['sidebar'],
  //   order: 50,
  //   children: [
  //     {
  //       id: 'users',
  //       label: 'ユーザー管理',
  //       path: '/management/users',
  //       icon: PeopleOutlined, // import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
  //       placement: ['sidebar'],
  //       order: 1,
  //     },
  //   ],
  // },

];

/**
 * 指定された配置場所のナビゲーションアイテムを取得
 */
export const getNavigationItemsByPlacement = (placement: NavigationPlacement): NavigationItemType[] => {
  return navigationItems
    .filter(item => 
      item.placement.includes(placement) || item.placement.includes('all')
    )
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

/**
 * サイドメニュー用のナビゲーションアイテムを取得
 */
export const getSidebarNavigationItems = (): NavigationItemType[] => {
  return getNavigationItemsByPlacement('sidebar');
};

/**
 * ボトムナビゲーション用のナビゲーションアイテムを取得
 */
export const getBottomNavigationItems = (): NavigationItemType[] => {
  return getNavigationItemsByPlacement('bottom');
};

/**
 * ヘッダーメニュー用のナビゲーションアイテムを取得
 */
export const getHeaderNavigationItems = (): NavigationItemType[] => {
  return getNavigationItemsByPlacement('header');
};

/**
 * ナビゲーションアイテムをIDで検索
 */
export const findNavigationItemById = (id: string): NavigationItemType | undefined => {
  const findInItems = (items: NavigationItemType[]): NavigationItemType | undefined => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const found = findInItems(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  return findInItems(navigationItems);
};

/**
 * パスからナビゲーションアイテムを検索
 */
export const findNavigationItemByPath = (path: string): NavigationItemType | undefined => {
  const findInItems = (items: NavigationItemType[]): NavigationItemType | undefined => {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = findInItems(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  return findInItems(navigationItems);
};

/**
 * アクティブなナビゲーションアイテムの判定
 */
export const isNavigationItemActive = (item: NavigationItemType, currentPath: string): boolean => {
  return item.path === currentPath || currentPath.startsWith(item.path + '/');
};

// ========================================
// 後方互換性のための設定
// ========================================

/**
 * @deprecated sideMenuItems は navigationItems に移行してください
 */
export const sideMenuItems = navigationItems;

/**
 * @deprecated SideMenuItemType は NavigationItemType に移行してください
 */
export type SideMenuItemType = NavigationItemType;

/**
 * @deprecated findMenuItemById は findNavigationItemById に移行してください
 */
export const findMenuItemById = findNavigationItemById;

/**
 * @deprecated findMenuItemByPath は findNavigationItemByPath に移行してください
 */
export const findMenuItemByPath = findNavigationItemByPath;

/**
 * @deprecated isMenuItemActive は isNavigationItemActive に移行してください
 */
export const isMenuItemActive = isNavigationItemActive;

// ========================================
// routes.ts との連携について
// ========================================

/**
 * 新しいページを追加する際の手順：
 * 
 * 1. routes.ts にルート設定を追加
 *    例:
 *    dashboard: {
 *      path: "/dashboard",
 *      loader: () => import("@features/dashboard/Dashboard"),
 *      breadcrumb: { label: "ダッシュボード" },
 *    }
 * 
 * 2. navigationConfig.tsx にナビゲーションアイテムを追加（ナビゲーションに表示する場合）
 *    例:
 *    {
 *      id: 'dashboard',
 *      label: 'ダッシュボード',
 *      path: '/dashboard',  // routes.ts のパスと一致させる
 *      icon: DashboardOutlinedIcon,
 *      placement: ['sidebar'], // 表示したいナビゲーション要素を指定
 *      order: 2,
 *    }
 * 
 * 3. 対応するコンポーネントファイルを作成
 *    例: src/features/dashboard/Dashboard.tsx
 * 
 * ナビゲーション配置の使い分け：
 * - sidebar: サイドメニュー（管理画面、詳細機能）
 * - bottom: ボトムナビゲーション（主要な画面、モバイルでよく使用）
 * - header: ヘッダーメニュー（ユーザー関連、設定）
 * - all: 全てのナビゲーション要素
 * 
 * 注意事項：
 * - pathは routes.ts の設定と必ず一致させてください
 * - ボトムナビゲーションは通常3-5個程度に制限することを推奨
 * - 階層メニュー（children）はサイドメニューでのみ使用可能
 * - orderで表示順序を制御できます（小さい順）
 * - アイコンは個別インポートでバンドルサイズを最適化してください
 */ 