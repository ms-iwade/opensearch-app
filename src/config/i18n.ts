import { I18n } from "@aws-amplify/core";
import { translations } from "@aws-amplify/ui-react";

/**
 * Amplify UI 国際化設定
 *
 * このファイルでは、Amplify UIコンポーネント（特にAuthenticator）の
 * 日本語化設定を行います。
 *
 * 設定手順：
 * 1. デフォルトの翻訳辞書を読み込み
 * 2. 言語を設定
 * 3. カスタム翻訳を追加
 */

// 1. Amplify UIのデフォルト翻訳辞書を読み込み
// これにより、基本的なUI要素（ボタン、ラベルなど）が多言語対応されます
I18n.putVocabularies(translations);

// 2. アプリケーションの言語を日本語に設定
// 対応言語: 'en', 'ja', 'fr', 'de', 'es', 'it', 'pt', 'zh', 'ko' など
I18n.setLanguage("ja");

// 3. カスタム翻訳を追加
// デフォルトの翻訳で不足している部分や、
// アプリケーション固有のメッセージを日本語化します
I18n.putVocabulariesForLanguage("ja", {
  // エラーメッセージ
  "PreSignUp failed with error Invalid email domain.":
    "無効なメールドメインです。",
  "Your passwords must match": "パスワードが一致しません",

  // UI要素
  "Create Account": "アカウント作成",
  "Forgot your password?": "パスワードを忘れた方はこちら",

  // 必要に応じて追加のカスタム翻訳をここに記述
  // "Sign In": "サインイン",
  // "Sign Up": "サインアップ",
  // "Sign Out": "サインアウト",
  // "Email": "メールアドレス",
  // "Password": "パスワード",
  // "Confirm Password": "パスワード確認",
  // "Phone Number": "電話番号",
  // "Username": "ユーザー名",
  // "Code": "確認コード",
  // "Confirm": "確認",
  // "Resend Code": "コードを再送信",
  // "Back to Sign In": "サインインに戻る",
  // "Reset your password": "パスワードをリセット",
  // "Send code": "コードを送信",
  // "Submit": "送信",
  // "Skip": "スキップ",
  // "Change Password": "パスワード変更",
  // "New Password": "新しいパスワード",
  // "We Emailed You": "メールを送信しました",
  // "We Texted You": "SMSを送信しました",
  // "Account recovery requires verified contact information": "アカウント復旧には確認済みの連絡先情報が必要です",
});

/**
 * 使用方法：
 *
 * 1. このファイルはproviders.tsxでインポートしています。
 *    import "@config/i18n";
 *
 * 2. Authenticatorコンポーネントが自動的に日本語化されます。
 *
 * 3. 新しい翻訳を追加する場合
 *    I18n.putVocabulariesForLanguage("ja", {
 *      "Original English Text": "日本語翻訳",
 *    });
 *
 * 4. 他の言語を追加する場合：
 *    I18n.putVocabulariesForLanguage("en", {
 *      "カスタムメッセージ": "Custom Message",
 *    });
 *
 * 参考リンク：
 * - Amplify UI i18n: https://ui.docs.amplify.aws/react/getting-started/internationalization
 * - 利用可能な翻訳キー: https://github.com/aws-amplify/amplify-ui/blob/main/packages/ui/src/i18n/dictionaries/authenticator/ja.ts
 */
