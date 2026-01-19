// アプリケーションのタイトルをここに設定して下さい。
export const APP_TITLE = "Gen2template";

/**
 * バージョン情報
 * Viteのdefineによってビルド時に注入される値
 */

// TypeScript用の型定義
declare global {
  const __APP_VERSION__: string;
}

// バージョン情報の取得
export const getVersionInfo = () => {
  return {
    version:
      typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "unknown",
  };
};

// 個別のエクスポート
export const APP_VERSION = getVersionInfo().version;

/**
 * フォーマット済みバージョン文字列を取得
 * @returns フォーマットされたバージョン情報
 */
export const getFormattedVersion = () => {
  const info = getVersionInfo();
  return `v${info.version}`;
};

// バージョン更新方法
// `package.json`のバージョンを更新すると、次回ビルド時に自動的にUIに反映されます。
//
// 例
// npm version patch  # 1.0.0 → 1.0.1
// npm version minor  # 1.0.0 → 1.1.0
// npm version major  # 1.0.0 → 2.0.0
//
