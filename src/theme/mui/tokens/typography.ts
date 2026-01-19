/**
 * タイポグラフィトークン
 * MUIデフォルトタイポグラフィ設定
 * アクセシビリティ準拠: コントラスト比4.5:1以上（本文）、3:1以上（大型UI）
 * 数値表示: tabular-nums（等幅）優先、SI単位系、半角数字必須
 */

export const typography = {
  // 推奨フォントスタック（日本語最適化）
  fontFamily: '"Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic Medium", "Meiryo", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  fontSize: 14, // 基本サイズ (body1)
  
  // 見出し（Atlassian仕様）
  h1: {
    fontSize: "1.5rem",    // 24px - 画面タイトル（ページ最上段）
    fontWeight: 500,
    lineHeight: 1.25,      // 見出し行間
  },
  h2: {
    fontSize: "1.25rem",   // 20px - セクション見出し
    fontWeight: 500,
    lineHeight: 1.25,      // 見出し行間
  },
  h3: {
    fontSize: "1.125rem",  // 18px - カード見出し/モーダルタイトル
    fontWeight: 500,
    lineHeight: 1.25,      // 見出し行間
  },
  h4: {
    fontSize: "1rem",      // 16px - 小見出し
    fontWeight: 500,
    lineHeight: 1.25,      // 見出し行間
  },
  h5: {
    fontSize: "0.875rem",  // 14px - 小さい見出し
    fontWeight: 500,
    lineHeight: 1.25,      // 見出し行間
  },
  h6: {
    fontSize: "0.813rem",  // 13px - 最小見出し
    fontWeight: 500,
    lineHeight: 1.25,      // 見出し行間
  },
  
  // 本文テキスト（Atlassian仕様）
  body1: {
    fontSize: "0.875rem",  // 14px - 基本文字（説明文・フォームラベル）
    lineHeight: 1.6,       // 本文行間
    fontVariantNumeric: "tabular-nums", // 数値等幅
  },
  body2: {
    fontSize: "0.813rem",  // 13px - テーブル内や補助テキスト
    lineHeight: 1.3,       // 表内行間
    fontVariantNumeric: "tabular-nums", // 数値等幅
  },
  
  
  
};
