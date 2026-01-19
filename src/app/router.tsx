import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { lazy, Suspense } from "react";
import { Box } from '@mui/material';
import { AppShell } from './layout/AppShell';
import { routeConfigs } from '@config/routes';
import { LoadingSpinner } from '@shared/loading';

// ローディングコンポーネント
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    minHeight="calc(100vh - 120px)"
  >
    <LoadingSpinner 
      size="medium" 
      message="ページを読み込み中..." 
      minHeight="auto"
    />
  </Box>
);

// ルート設定からLazyComponentを作成
const createRoutes = () => {
  return Object.entries(routeConfigs)
    .map(([routeKey, config]) => {
      if (!config.loader) {
        console.error(`Loader function not found for route: ${routeKey}`);
        return null;
      }

      // React.lazyを使用してコンポーネントを動的にロード
      const LazyComponent = lazy(async () => {
        try {
          const module = await config.loader!();
          // デフォルトエクスポートまたは名前付きエクスポートに対応
          return {
            default: module.default || module,
          };
        } catch (error) {
          console.error(
            `Failed to load component for route: ${routeKey}`,
            error
          );
          throw error;
        }
      });

      return {
        component: LazyComponent,
        config,
        routeKey,
      };
    })
    .filter((route): route is NonNullable<typeof route> => route !== null);
};

// React Router v7のCode Splitting
const createRouteElements = () => {
  const routes = createRoutes();
  
  return routes.map(({ component: LazyComponent, config }) => {
    const WrappedComponent = () => (
      <Suspense fallback={<LoadingFallback />}>
        <LazyComponent />
      </Suspense>
    );
    
    if (config.path === routeConfigs.home.path) {
      // ホームルートはindex routeとして設定
      return {
        index: true,
        element: <WrappedComponent />,
      };
    } else {
      // その他のルート
      return {
        path: config.path,
        element: <WrappedComponent />,
      };
    }
  });
};

// React Router v7のルーター設定
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      ...createRouteElements(),
      {
        path: "*",
        element: <Navigate to={routeConfigs.home.path} replace />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};