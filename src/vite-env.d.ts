/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 他の環境変数がある場合はここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
