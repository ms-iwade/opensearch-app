import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { useLoading, LoadingSpinner } from '@shared/loading';

export const LoadingDemo = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [localLoading, setLocalLoading] = useState(false);

  const handleFullScreenLoading = async () => {
    startLoading({ 
      fullScreen: true, 
      message: 'フルスクリーンローディング中...' 
    });
    setTimeout(() => {
      stopLoading();
    }, 3000);
  };

  const handleOverlayLoading = async () => {
    startLoading({ 
      overlay: true, 
      message: 'オーバーレイローディング中...' 
    });
    setTimeout(() => {
      stopLoading();
    }, 3000);
  };

  const handleLocalLoading = async () => {
    setLocalLoading(true);
    setTimeout(() => {
      setLocalLoading(false);
    }, 3000);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ローディングシステムデモ
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          統一ローディングシステムの各種パターンをテストできます。
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="subtitle1" gutterBottom>
              グローバルローディング
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleFullScreenLoading}
                disabled={isLoading}
              >
                フルスクリーン
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleOverlayLoading}
                disabled={isLoading}
              >
                オーバーレイ
              </Button>
            </Box>
          </Grid>

          <Grid size={6}>
            <Typography variant="subtitle1" gutterBottom>
              ローカルローディング
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleLocalLoading}
              disabled={localLoading}
              sx={{ mb: 2 }}
            >
              ローカルローディング
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          ローカルローディングエリア
        </Typography>
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
          <LoadingSpinner 
            loading={localLoading} 
            size="small" 
            minHeight="120px"
            message="ローカルデータを読み込み中..." 
          />
          {!localLoading && (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              ローカルローディングのテストエリア
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            グローバルローディング状態: {isLoading ? '実行中' : '停止中'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}; 