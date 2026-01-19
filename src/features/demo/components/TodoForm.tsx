import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  Tabs,
  Tab,
  Alert,
  InputAdornment,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import type { CreateMethod, TodoFormData } from '../types/todo';

interface TodoFormProps {
  loading: boolean;
  createResult: string;
  onSubmit: (formData: TodoFormData, createMethod: CreateMethod) => Promise<boolean>;
}

export const TodoForm = ({ loading, createResult, onSubmit }: TodoFormProps) => {
  const [content, setContent] = useState('');
  const [createMethod, setCreateMethod] = useState<CreateMethod>('direct');

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    // 新規作成時は常に未完了状態で追加
    const success = await onSubmit({ content, status: 'PENDING' }, createMethod);
    if (success) {
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        Todoを追加
      </Typography>
      
      {/* 作成方法選択 */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={createMethod} 
          onChange={(_, value) => setCreateMethod(value)}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab 
            value="direct" 
            label="作成" 
            iconPosition="start"
          />
          <Tab 
            value="lambda" 
            label="Lambda作成" 
            iconPosition="start"
          />
        </Tabs>
        
        <Typography variant="body2" color="text.secondary">
          {createMethod === 'direct' 
            ? '💾 通常のAmplify Data client.models.Todo.create()を使用'
            : '⚡ client.mutations.createCustomTodo()を使用（Lambda経由）'
          }
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            fullWidth
            label="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            placeholder="やることを入力してください..."
            helperText="Ctrl+Enterで作成"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleSubmit}
                      disabled={!content.trim() || loading}
                      color="primary"
                      aria-label="新規Todoを作成"
                      size="small"
                      edge="end"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      }}
                    >
                      <ArrowUpwardIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
        </Grid>
      </Grid>

      {/* 作成結果表示 */}
      {createResult && (
        <Alert 
          severity={createResult.includes('成功') ? 'success' : 'error'} 
          sx={{ mt: 2 }}
        >
          {createResult}
        </Alert>
      )}
    </Box>
  );
}; 