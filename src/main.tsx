import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { APP_TITLE } from "@config/constants"; // アプリケーション全体のタイトルを設定します
import { Providers } from "@app/providers"; // プロバイダーをインポートします
import { tokens } from "@theme/mui/tokens"; // テーマトークンをインポート

// HTMLドキュメントのタイトルをアプリケーションタイトルに設定します
document.title = APP_TITLE;

// テーマカラーを動的に設定
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
if (themeColorMeta) {
  themeColorMeta.setAttribute('content', tokens.colors.primary.main);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);