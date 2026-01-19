import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import { useTodoOperations } from '../hooks/useTodoOperations';
import { useTodoSubscription } from '../hooks/useTodoSubscription';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import type { Todo, TodoStatus, CreateMethod, TodoFormData } from '../types/todo';

export const CrudOperationDemo = () => {
  // 状態管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]); // 統計表示用の全Todo
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<TodoStatus>('PENDING');

  // カスタムフック
  const {
    loading,
    createResult,
    fetchTodosByStatus,
    createTodo,
    updateTodo,
    deleteTodo,
    clearCreateResult,
  } = useTodoOperations();

  // データ取得
  const loadTodos = useCallback(async (status: TodoStatus) => {
    const fetchedTodos = await fetchTodosByStatus(status);
    setTodos(fetchedTodos);
  }, [fetchTodosByStatus]);

  // 全Todoデータの取得（統計用）
  const loadAllTodos = useCallback(async () => {
    const [pendingTodos, completedTodos] = await Promise.all([
      fetchTodosByStatus('PENDING'),
      fetchTodosByStatus('COMPLETED'),
    ]);
    setAllTodos([...pendingTodos, ...completedTodos]);
  }, [fetchTodosByStatus]);

  // 編集操作
  const handleEditStart = useCallback((todoId: string) => {
    setEditingTodoId(todoId);
  }, []);

  const handleEditCancel = useCallback(() => {
    setEditingTodoId(null);
  }, []);

  // CRUD操作ハンドラー
  const handleCreateTodo = useCallback(async (
    formData: TodoFormData, 
    createMethod: CreateMethod
  ): Promise<boolean> => {
    const success = await createTodo(formData, createMethod);
    if (success && createMethod === 'lambda') {
      // Lambda作成後は手動でリフレッシュ（サブスクリプションが動作しない場合があるため）
      await loadTodos(statusFilter);
      await loadAllTodos(); // 統計も更新
    }
    return success;
  }, [createTodo, loadTodos, loadAllTodos, statusFilter]);

  const handleUpdateTodo = useCallback(async (
    id: string, 
    content: string, 
    status: TodoStatus
  ): Promise<void> => {
    await updateTodo(id, content, status);
    // 統計更新のため全データを再取得
    await loadAllTodos();
  }, [updateTodo, loadAllTodos]);

  const handleDeleteTodo = useCallback(async (id: string): Promise<void> => {
    await deleteTodo(id);
    // 統計更新のため全データを再取得
    await loadAllTodos();
  }, [deleteTodo, loadAllTodos]);

  const handleStatusFilterChange = useCallback((status: TodoStatus) => {
    setStatusFilter(status);
  }, []);

  // サブスクリプションハンドラー
  const handleTodoCreate = useCallback((todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
    setAllTodos((prev) => [todo, ...prev]);
  }, []);

  const handleTodoUpdate = useCallback((todo: Todo) => {
    setTodos((prev) => {
      if (todo.status !== statusFilter) {
        return prev.filter((t) => t.id !== todo.id);
      }
      return prev.map((t) => t.id === todo.id ? todo : t);
    });
    setAllTodos((prev) => prev.map((t) => t.id === todo.id ? todo : t));
  }, [statusFilter]);

  const handleTodoDelete = useCallback((todo: Todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setAllTodos((prev) => prev.filter((t) => t.id !== todo.id));
  }, []);

  // リアルタイムサブスクリプション
  useTodoSubscription({
    statusFilter,
    editingTodoId,
    onTodoCreate: handleTodoCreate,
    onTodoUpdate: handleTodoUpdate,
    onTodoDelete: handleTodoDelete,
    onEditCancel: handleEditCancel,
  });

  // 初期化とフィルター変更時の処理
  useEffect(() => {
    loadTodos(statusFilter);
  }, [loadTodos, statusFilter]);

  // 初期化時に全Todoも取得
  useEffect(() => {
    loadAllTodos();
  }, [loadAllTodos]);

  // 結果クリア
  useEffect(() => {
    if (createResult) {
      const timer = setTimeout(() => {
        clearCreateResult();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [createResult, clearCreateResult]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          CRUD操作デモ
        </Typography>

        {/* 新規作成フォーム */}
        <TodoForm
          loading={loading}
          createResult={createResult}
          onSubmit={handleCreateTodo}
        />

        {/* Todo一覧 */}
        <TodoList
          todos={todos}
          loading={loading}
          statusFilter={statusFilter}
          editingTodoId={editingTodoId}
          allTodos={allTodos}
          onStatusFilterChange={handleStatusFilterChange}
          onEditStart={handleEditStart}
          onEditCancel={handleEditCancel}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      </CardContent>
    </Card>
  );
}; 