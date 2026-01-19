import { useState, type ReactNode } from 'react';
import { LoadingContext, type LoadingContextType, type LoadingOptions } from './types';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<LoadingOptions>({});

  const startLoading = (newOptions: LoadingOptions = {}) => {
    setOptions(newOptions);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setOptions({});
  };

  const value: LoadingContextType = {
    isLoading,
    startLoading,
    stopLoading,
    options,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {/* グローバルローディング */}
      {isLoading && (
        <LoadingSpinner
          loading={isLoading}
          // fullScreenまたはoverlayが明示的に指定された場合のみ表示
          fullScreen={options.fullScreen}
          overlay={options.overlay}
          {...options}
        />
      )}
    </LoadingContext.Provider>
  );
}; 