import { useState, useEffect, type ReactNode } from 'react';
import { getCurrentUser, signOut, fetchAuthSession } from 'aws-amplify/auth';
import { AuthContext, type UserInfo, type AuthContextType } from './types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ isAuthenticated: false });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [user, session] = await Promise.all([getCurrentUser(), fetchAuthSession()]);
      
      setUserInfo({
        isAuthenticated: true,
        username: user.username,
        userId: user.userId,
        identityId: session.identityId,
        groups: session.tokens?.accessToken?.payload['cognito:groups'] as string[] || [],
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUserInfo({ isAuthenticated: false });
      // 認証エラーは通常の状態なので、エラーとして表示しない
      if (error instanceof Error && !error.message.includes('not authenticated')) {
        setError(`認証情報の取得に失敗しました: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUserInfo({ isAuthenticated: false });
      setError(null);
    } catch (error) {
      const errorMessage = `ログアウトに失敗しました: ${error instanceof Error ? error.message : String(error)}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const refreshUserInfo = async () => {
    await fetchUserInfo();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const value: AuthContextType = {
    userInfo,
    isLoading,
    error,
    logout,
    refreshUserInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 