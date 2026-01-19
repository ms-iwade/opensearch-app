import { createContext } from "react";

export interface LoadingOptions {
  /** ローディングサイズ */
  size?: "small" | "medium" | "large";
  /** 最小高さ */
  minHeight?: string;
  /** カスタムメッセージ */
  message?: string;
  /** フルスクリーンローディング */
  fullScreen?: boolean;
  /** 背景オーバーレイの表示 */
  overlay?: boolean;
}

export interface LoadingContextType {
  /** グローバルローディング状態 */
  isLoading: boolean;
  /** ローディング開始 */
  startLoading: (options?: LoadingOptions) => void;
  /** ローディング終了 */
  stopLoading: () => void;
  /** 現在のローディングオプション */
  options: LoadingOptions;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
); 