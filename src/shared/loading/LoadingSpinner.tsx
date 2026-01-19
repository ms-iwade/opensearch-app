import { 
  CircularProgress, 
  Box, 
  Typography, 
  Backdrop,
  useTheme 
} from '@mui/material';
import type { LoadingOptions } from './types';

interface LoadingSpinnerProps extends LoadingOptions {
  /** ローディング状態 */
  loading?: boolean;
}

export const LoadingSpinner = ({
  loading = true,
  size = "medium",
  minHeight = "200px",
  message,
  fullScreen = false,
  overlay = false,
}: LoadingSpinnerProps) => {
  const theme = useTheme();

  if (!loading) return null;

  // サイズマッピング
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  const spinnerSize = sizeMap[size];

  const content = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={fullScreen ? "100vh" : minHeight}
      width="100%"
      gap={2}
    >
      <CircularProgress size={spinnerSize} />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          textAlign="center"
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  // フルスクリーンまたはオーバーレイの場合
  if (fullScreen || overlay) {
    return (
      <Backdrop
        sx={{ 
          color: '#fff', 
          // ドロワーとAppBarより確実に前面に表示
          zIndex: theme.zIndex.modal,
          backgroundColor: overlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent'
        }}
        open={loading}
      >
        {content}
      </Backdrop>
    );
  }

  return content;
}; 