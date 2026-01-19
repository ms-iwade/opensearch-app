import { useState } from 'react';
import {
  Box,
  TextField,
  ListItem,
  IconButton,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { Todo, TodoStatus } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onEditStart: () => void;
  onEditCancel: () => void;
  onUpdate: (id: string, content: string, status: TodoStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoItem = ({
  todo,
  isEditing,
  onEditStart,
  onEditCancel,
  onUpdate,
  onDelete,
}: TodoItemProps) => {
  const [editingContent, setEditingContent] = useState(todo.content || '');

  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) return '不明';
    return new Date(dateString).toLocaleString('ja-JP');
  };

  const handleUpdate = async () => {
    if (!editingContent.trim()) return;
    // ステータスは現在の値を保持
    await onUpdate(todo.id, editingContent, (todo.status as TodoStatus) || 'PENDING');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
    if (e.key === 'Escape') {
      onEditCancel();
    }
  };

  const handleDelete = async () => {
    await onDelete(todo.id);
  };

  // ステータス切り替え（完了/未完了）
  const handleStatusToggle = async () => {
    const newStatus: TodoStatus = todo.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    await onUpdate(todo.id, todo.content || '', newStatus);
  };

  // ダブルクリックで編集開始
  const handleDoubleClickEdit = () => {
    setEditingContent(todo.content || '');
    onEditStart();
  };

  const isCompleted = todo.status === 'COMPLETED';

  return (
    <ListItem
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        p: 2,
        bgcolor: isCompleted ? 'action.hover' : 'background.paper',
        opacity: isCompleted ? 0.8 : 1,
      }}
    >
      {isEditing ? (
        // 編集モード - シンプルな入力フィールドのみ
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            placeholder="Todoの内容を入力..."
            autoFocus
            sx={{ mb: 1 }}
          />
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }}>
            💡 Enter: 保存 / Escape: キャンセル
          </Box>
        </Box>
      ) : (
        // 表示モード
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          {/* ステータス切り替えボタン */}
          <Box sx={{ mr: 2 }}>
            <Tooltip 
              title={isCompleted ? '未完了に戻す' : '完了にする'} 
              placement="top"
            >
              <IconButton
                onClick={handleStatusToggle}
                color={isCompleted ? 'success' : 'default'}
                size="small"
                sx={{ p: 0.5 }}
              >
                {isCompleted ? (
                  <CheckCircleIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {/* コンテンツ表示 */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  color: isCompleted ? 'text.secondary' : 'text.primary',
                  cursor: 'pointer',
                  p: 0.5,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onDoubleClick={handleDoubleClickEdit}
                title="ダブルクリックで編集"
              >
                {todo.content}
              </Box>
              <Chip 
                label={isCompleted ? '完了' : '未完了'} 
                color={isCompleted ? 'success' : 'warning'} 
                size="small" 
                variant="outlined"
              />
            </Box>
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              作成日時: {formatDateTime(todo.createdAt)}
            </Box>
          </Box>

          {/* アクションボタン（削除のみ） */}
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="削除" placement="top">
              <IconButton
                onClick={handleDelete}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      )}
    </ListItem>
  );
}; 