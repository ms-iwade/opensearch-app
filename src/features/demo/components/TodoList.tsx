import {
  Box,
  Typography,
  List,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import { TodoItem } from './TodoItem';
import type { Todo, TodoStatus } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  statusFilter: TodoStatus;
  editingTodoId: string | null;
  onStatusFilterChange: (status: TodoStatus) => void;
  onEditStart: (todoId: string) => void;
  onEditCancel: () => void;
  onUpdate: (id: string, content: string, status: TodoStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  allTodos?: Todo[]; // すべてのTodoの統計表示用
}

export const TodoList = ({
  todos,
  loading,
  statusFilter,
  editingTodoId,
  onStatusFilterChange,
  onEditStart,
  onEditCancel,
  onUpdate,
  onDelete,
  allTodos = [],
}: TodoListProps) => {
  // 統計計算
  const pendingCount = allTodos.filter(todo => todo.status === 'PENDING').length;
  const completedCount = allTodos.filter(todo => todo.status === 'COMPLETED').length;

  return (
    <>
      {/* フィルタータブ */}
      <Box>
        <Tabs 
          value={statusFilter} 
          onChange={(_, value) => onStatusFilterChange(value)}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab 
            value="PENDING" 
            label={
              <Badge badgeContent={pendingCount} color="warning" showZero>
                <Box sx={{ px: 1 }}>未完了</Box>
              </Badge>
            }
          />
          <Tab 
            value="COMPLETED" 
            label={
              <Badge badgeContent={completedCount} color="success" showZero>
                <Box sx={{ px: 1 }}>完了</Box>
              </Badge>
            }
          />
        </Tabs>
      </Box>

      {/* Todo一覧 */}
      {todos.length === 0 && !loading ? (
        <Box sx={{ 
          p: 4, 
          textAlign: 'center',
          bgcolor: 'action.hover',
          borderRadius: 2,
          border: '2px dashed',
          borderColor: 'divider'
        }}>
          <Typography color="text.secondary" variant="h6" gutterBottom>
            {statusFilter === 'PENDING' ? '未完了' : '完了'}のTodoがありません
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {statusFilter === 'PENDING' 
              ? '新しいTodoを作成してみましょう' 
              : '完了したTodoがここに表示されます'
            }
          </Typography>
        </Box>
      ) : (
        <List >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingTodoId === todo.id}
              onEditStart={() => onEditStart(todo.id)}
              onEditCancel={onEditCancel}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </List>
      )}
    </>
  );
}; 