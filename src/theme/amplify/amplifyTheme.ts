import type { Theme } from "@aws-amplify/ui-react";
import { tokens } from "../mui/tokens";

/**
 * AmplifyUI テーマ設定
 * MUIテーマと統一感のあるデザインを提供
 */
export const amplifyTheme: Theme = {
  name: "amplify-theme",
  tokens: {
    colors: {
      // プライマリカラー（MUIと統一）
      brand: {
        primary: {
          10: tokens.colors.primary.light,
          80: tokens.colors.primary.main,
          90: tokens.colors.primary.dark,
          100: tokens.colors.primary.dark,
        },
      },
      // 背景色
      background: {
        primary: tokens.colors.background.default,
        secondary: tokens.colors.background.paper,
      },
      // テキストカラー
      font: {
        primary: tokens.colors.text.primary,
        secondary: tokens.colors.text.secondary,
      },
      // ボーダーカラー
      border: {
        primary: tokens.colors.grey[300],
        secondary: tokens.colors.grey[200],
      },
      // エラーカラー
      red: {
        10: tokens.colors.error.light,
        80: tokens.colors.error.main,
        90: tokens.colors.error.dark,
      },
      // 成功カラー
      green: {
        10: tokens.colors.success.light,
        80: tokens.colors.success.main,
        90: tokens.colors.success.dark,
      },
      // 警告カラー
      orange: {
        10: tokens.colors.warning.light,
        80: tokens.colors.warning.main,
        90: tokens.colors.warning.dark,
      },
    },

    // コンポーネントごとのスタイル
    components: {
      // 認証フォーム全体のスタイルをMUIテーマと統一させるための設定
      authenticator: {
        router: {
          backgroundColor: tokens.colors.background.paper, // 背景色を設定
          borderColor: "transparent", // ボーダーを削除
          boxShadow: "none", // 影を削除
          borderWidth: "0px", // ボーダーを削除
        },
        modal: {
          backgroundColor: tokens.colors.background.paper, // 背景色を設定
        },
      },
      // ボタンのスタイル
      button: {
        primary: {
          backgroundColor: tokens.colors.primary.main,
          color: tokens.colors.primary.contrastText,
          _hover: {
            backgroundColor: tokens.colors.primary.dark,
          },
          _focus: {
            backgroundColor: tokens.colors.primary.dark,
          },
          _active: {
            backgroundColor: tokens.colors.primary.dark,
          },
        },
        link: {
          color: tokens.colors.primary.main,
          _hover: {
            color: tokens.colors.primary.main,
          },
        },
      },
      // 入力フィールドのスタイル
      fieldcontrol: {
        borderColor: tokens.colors.grey[300],
        _disabled: {
          backgroundColor: tokens.colors.grey[100],
        },
        _focus: {
          borderColor: tokens.colors.primary.main,
        },
        _error: {
          borderColor: tokens.colors.error.main,
        },
      },
      // パスワードフィールドのスタイル
      passwordfield: {
        button: {
          color: tokens.colors.text.secondary,
          _hover: {
            borderColor: tokens.colors.primary.main,
            color: tokens.colors.primary.main,
          },
          _focus: {
            borderColor: tokens.colors.primary.main,
            color: tokens.colors.primary.main,
          },
          _active: {
            borderColor: tokens.colors.primary.main,
            color: tokens.colors.primary.main,
          },
        },
      },
      // タブのスタイル
      tabs: {
        item: {
          color: tokens.colors.text.secondary,
          _active: {
            color: tokens.colors.primary.main,
            borderColor: tokens.colors.primary.main,
          },
          _hover: {
            color: tokens.colors.primary.main,
          },
        },
      },
      // ローダー（スピナー）のスタイル
      loader: {
        strokeFilled: tokens.colors.primary.main,
        strokeEmpty: tokens.colors.grey[200],
      },
    },
  },
};
