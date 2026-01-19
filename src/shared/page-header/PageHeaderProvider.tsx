import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import type { PageHeaderInfo, PageHeaderContextType } from "./types";
import { getPageHeaderByPath } from "./pageHeaderConfig";

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(
  undefined
);

interface PageHeaderProviderProps {
  children: ReactNode;
}

export const PageHeaderProvider = ({ children }: PageHeaderProviderProps) => {
  const location = useLocation();
  const [pageHeader, setPageHeader] = useState<PageHeaderInfo>({
    title: "",
    description: "",
  });

  useEffect(() => {
    const headerInfo = getPageHeaderByPath(location.pathname);
    if (headerInfo) {
      setPageHeader(headerInfo);
    }
  }, [location.pathname]);

  return (
    <PageHeaderContext.Provider value={{ pageHeader, setPageHeader }}>
      {children}
    </PageHeaderContext.Provider>
  );
};

export { PageHeaderContext };
