import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';

// package.jsonからバージョン情報を読み込み
import { readFileSync } from "fs";
import { resolve } from "path";

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8")
);

// constants.tsからアプリ名を読み込み
const constantsContent = readFileSync(resolve(__dirname, "src/config/constants.ts"), "utf-8");
const appTitleMatch = constantsContent.match(/export const APP_TITLE = ["'](.+?)["'];/);
const APP_TITLE = appTitleMatch ? appTitleMatch[1] : "Amplify Gen2 Template";

// theme/colorsからカラー情報を読み込み
const colorsContent = readFileSync(resolve(__dirname, "src/theme/mui/tokens/colors.ts"), "utf-8");
const primaryMainMatch = colorsContent.match(/main:\s*["']([^"']+)["'],/);
const PRIMARY_COLOR = primaryMainMatch ? primaryMainMatch[1] : "#1976d2";

const backgroundDefaultMatch = colorsContent.match(/default:\s*["']([^"']+)["'],/);
const BACKGROUND_COLOR = backgroundDefaultMatch ? backgroundDefaultMatch[1] : "#ffffff";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(), // tsconfigPathsを追加
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // 開発環境でもPWAをテスト可能
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: APP_TITLE,
        short_name: APP_TITLE.length > 12 ? APP_TITLE.substring(0, 12) : APP_TITLE,
        theme_color: PRIMARY_COLOR,
        background_color: BACKGROUND_COLOR,
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png', // Androidのアプリアイコン
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      },
    })
  ],

  // 環境変数として注入
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },

  // host
  // localhostで同一ネットワーク内の他のデバイスからアクセスできるように
  server: {
    host: true,
    // port: 3000, // 許可したいポート番号を指定して下さい。
  },
});
