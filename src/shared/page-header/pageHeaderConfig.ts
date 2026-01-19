import type { PageHeaderInfo } from "./types";

export const pageHeaderConfig: Record<string, PageHeaderInfo> = {
  "/": {
    title: "ホーム",
    description: "アプリケーションのホーム画面です。",
  },
};

export const getPageHeaderByPath = (
  path: string
): PageHeaderInfo | undefined => {
  return pageHeaderConfig[path];
};
