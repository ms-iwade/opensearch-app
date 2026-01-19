import { useContext } from "react";
import { PageHeaderContext } from "./PageHeaderProvider";

export const usePageHeader = () => {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error("usePageHeader must be used within PageHeaderProvider");
  }
  return context;
};
