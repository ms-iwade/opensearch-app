export interface PageHeaderInfo {
  title: string;
  description?: string;
}

export interface PageHeaderContextType {
  pageHeader: PageHeaderInfo;
  setPageHeader: (header: PageHeaderInfo) => void;
}
