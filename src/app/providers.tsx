import type { ReactNode } from 'react';
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider as AmplifyThemeProvider } from '@aws-amplify/ui-react';
import { amplifyTheme } from '@src/theme/amplify/amplifyTheme';
import AuthComponents from '@app/layout/auth/AuthComponents';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@src/theme/mui/muiTheme';
import { AuthProvider } from '@shared/auth';
import { LoadingProvider } from '@shared/loading';
import "@aws-amplify/ui-react/styles.css";

import outputs from "../../amplify_outputs.json";
// 国際化設定を読み込み - この行により、Amplify UIコンポーネントが日本語化されます
import "@config/i18n";

// AWS Amplifyライブラリを設定します。`../amplify_outputs.json` から設定情報を読み込みます
Amplify.configure(outputs);

interface ProvidersProps {
  children: ReactNode;
}

/**
 * アプリケーション全体のプロバイダーを統合
 * テーマ、認証、国際化、AWS Amplifyなどを一元管理
 * 
 * 国際化について：
 * - @config/i18nのインポートにより、Authenticatorコンポーネントが自動的に日本語化されます
 * - 言語設定やカスタム翻訳の変更は src/config/i18n.ts で行います
 */
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AmplifyThemeProvider theme={amplifyTheme}>
        <CssBaseline />
        <LoadingProvider>
        <Authenticator
          // hideSignUp={true} // サインアップタブを非表示にする場合はこちらを有効化
          variation="modal"
          components={AuthComponents}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </Authenticator>
        </LoadingProvider>
      </AmplifyThemeProvider>
    </ThemeProvider>
  );
}; 