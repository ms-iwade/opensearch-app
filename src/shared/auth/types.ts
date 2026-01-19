import { createContext } from "react";

export interface UserInfo {
  isAuthenticated: boolean;
  username?: string;
  userId?: string;
  identityId?: string;
  groups?: string[];
}

export interface AuthContextType {
  userInfo: UserInfo;
  isLoading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  refreshUserInfo: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
