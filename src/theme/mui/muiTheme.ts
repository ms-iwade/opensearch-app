import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

/**
 * MUI テーマ設定
 * デザインシステムの中核となる設定
 * Material-UI v7 + CSS Variables対応
 */
export const theme = createTheme({
  // CSS Variables を有効化（v7の新機能）
  cssVariables: {
    colorSchemeSelector: "class", // 'media' | 'class' | 'data'
  },
  colorSchemes: {
    light: true,
    // dark: true, // ダークモードを有効化する場合はこちらを有効化
  },

  palette: {
    mode: "light",
    primary: {
      main: tokens.colors.primary.main,
      light: tokens.colors.primary.light,
      dark: tokens.colors.primary.dark,
      contrastText: tokens.colors.primary.contrastText,
    },
    secondary: {
      main: tokens.colors.secondary.main,
      light: tokens.colors.secondary.light,
      dark: tokens.colors.secondary.dark,
      contrastText: tokens.colors.secondary.contrastText,
    },
    error: {
      main: tokens.colors.error.main,
    },
    warning: {
      main: tokens.colors.warning.main,
    },
    info: {
      main: tokens.colors.info.main,
    },
    success: {
      main: tokens.colors.success.main,
    },
    background: {
      default: tokens.colors.background.default,
      paper: tokens.colors.background.paper,
    },
    text: {
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "64px !important",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        paper: {
          borderRadius: "12px",
        },
      },
    },
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize,
    h1: {
      fontSize: tokens.typography.h1.fontSize,
      fontWeight: tokens.typography.h1.fontWeight,
      lineHeight: tokens.typography.h1.lineHeight,
    },
    h2: {
      fontSize: tokens.typography.h2.fontSize,
      fontWeight: tokens.typography.h2.fontWeight,
      lineHeight: tokens.typography.h2.lineHeight,
    },
    h3: {
      fontSize: tokens.typography.h3.fontSize,
      fontWeight: tokens.typography.h3.fontWeight,
      lineHeight: tokens.typography.h3.lineHeight,
    },
    h4: {
      fontSize: tokens.typography.h4.fontSize,
      fontWeight: tokens.typography.h4.fontWeight,
      lineHeight: tokens.typography.h4.lineHeight,
    },
    h5: {
      fontSize: tokens.typography.h5.fontSize,
      fontWeight: tokens.typography.h5.fontWeight,
      lineHeight: tokens.typography.h5.lineHeight,
    },
    h6: {
      fontSize: tokens.typography.h6.fontSize,
      fontWeight: tokens.typography.h6.fontWeight,
      lineHeight: tokens.typography.h6.lineHeight,
    },
    body1: {
      fontSize: tokens.typography.body1.fontSize,
      lineHeight: tokens.typography.body1.lineHeight,
    },
    body2: {
      fontSize: tokens.typography.body2.fontSize,
      lineHeight: tokens.typography.body2.lineHeight,
    },
  },
});
