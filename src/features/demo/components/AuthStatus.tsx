import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '@shared/auth';
import { LoadingSpinner } from '@shared/loading';

export const AuthStatus = () => {
  const { userInfo, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>認証状態</Typography>
          <LoadingSpinner 
            loading={isLoading} 
            size="small" 
            minHeight="100px"
            message="認証情報を読み込み中..." 
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>認証状態</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip
            icon={userInfo.isAuthenticated ? <CheckIcon /> : <WarningIcon />}
            label={userInfo.isAuthenticated ? '認証済み' : '未認証'}
            color={userInfo.isAuthenticated ? 'success' : 'warning'}
            variant="outlined"
          />
          {userInfo.username && (
            <Chip
              icon={<PersonIcon />}
              label={`ユーザー: ${userInfo.username}`}
              variant="outlined"
            />
          )}
          {userInfo.identityId && (
            <Chip
              icon={<InfoIcon />}
              label={`Identity ID: ${userInfo.identityId.substring(0, 20)}...`}
              variant="outlined"
            />
          )}
        </Box>

        {userInfo.isAuthenticated && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              ユーザー詳細
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • ユーザーID: {userInfo.userId}<br/>
              • Identity ID: {userInfo.identityId}<br/>
              • グループ: {userInfo.groups?.join(', ') || 'なし'}<br/>
              • 認証モード: userPool（ユーザープール認証）
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}; 