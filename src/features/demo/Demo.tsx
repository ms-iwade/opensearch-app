import {
  Container,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import { AuthStatus } from './components/AuthStatus';
import { CrudOperationDemo } from './components/CrudOperationDemo';
import { LoadingDemo } from './components/LoadingDemo';
import { APP_TITLE } from '@config/constants';

export default function Demo() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {/* ヘッダー */}
        <Grid size={12}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {APP_TITLE}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              AWS Amplify Gen2 テンプレート
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              AWS Amplify + React + TypeScript + MUI
            </Typography>
          </Paper>
        </Grid>
        <Grid size={12}>
          {/* 認証状態セクション */}
          <AuthStatus />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* CRUD操作デモセクション */}
          <CrudOperationDemo />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* ローディングシステムデモセクション */}
          <LoadingDemo />
        </Grid>
      </Grid>
    </Container>
  );
} 