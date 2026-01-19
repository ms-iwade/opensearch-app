import { useState, useCallback } from 'react';
import { client } from '@shared/clients/amplify';
import type { Todo, TodoStatus, CreateMethod, TodoFormData } from '../types/todo';

export const useTodoOperations = () => {
  const [loading, setLoading] = useState(false);
  const [createResult, setCreateResult] = useState<string>('');

  // データ取得
  const fetchTodosByStatus = useCallback(async (status: TodoStatus): Promise<Todo[]> => {
    setLoading(true);
    try {
      const result = await client.models.Todo.todosByStatus({
        status: status,
      });
      
      if (result.errors) {
        console.error('Error fetching todos:', result.errors);
        return [];
      }
      
      return (result.data as Todo[]) || [];
    } catch (error) {
      console.error('Error:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 作成（通常のcreate）
  const createTodoDirect = useCallback(async (formData: TodoFormData): Promise<boolean> => {
    if (!formData.content.trim()) return false;

    try {
      const result = await client.models.Todo.create({
        content: formData.content,
        status: formData.status,
      });
      
      if (result.errors) {
        console.error('Error creating todo:', result.errors);
        setCreateResult('エラー: 作成に失敗しました');
        return false;
      }
      
      if (result.data) {
        setCreateResult('成功: 作成されました');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error:', error);
      setCreateResult('エラー: 作成に失敗しました');
      return false;
    }
  }, []);

  // Lambda経由作成（カスタムミューテーション）
  const createTodoLambda = useCallback(async (formData: TodoFormData): Promise<boolean> => {
    if (!formData.content.trim()) return false;

    try {
      const result = await client.mutations.createCustomTodo({
        content: formData.content,
        status: formData.status,
      });
      
      if (result.errors) {
        console.error('Error creating custom todo:', result.errors);
        setCreateResult('エラー: Lambda作成に失敗しました');
        return false;
      }
      
      if (result.data) {
        setCreateResult(`成功: Lambda経由で作成されました (${JSON.stringify(result.data)})`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error:', error);
      setCreateResult('エラー: Lambda作成に失敗しました');
      return false;
    }
  }, []);

  // 作成実行
  const createTodo = useCallback(async (
    formData: TodoFormData, 
    createMethod: CreateMethod
  ): Promise<boolean> => {
    setCreateResult('');
    if (createMethod === 'direct') {
      return await createTodoDirect(formData);
    } else {
      return await createTodoLambda(formData);
    }
  }, [createTodoDirect, createTodoLambda]);

  // 更新
  const updateTodo = useCallback(async (
    id: string, 
    content: string, 
    status: TodoStatus
  ): Promise<boolean> => {
    if (!content.trim()) return false;
    
    try {
      const result = await client.models.Todo.update({
        id,
        content,
        status,
      });
      
      if (result.errors) {
        console.error('Error updating todo:', result.errors);
        return false;
      }
      
      return !!result.data;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }, []);

  // 削除
  const deleteTodo = useCallback(async (id: string): Promise<boolean> => {
    try {
      const result = await client.models.Todo.delete({ id });
      
      if (result.errors) {
        console.error('Error deleting todo:', result.errors);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }, []);

  // 結果クリア
  const clearCreateResult = useCallback(() => {
    setCreateResult('');
  }, []);

  return {
    loading,
    createResult,
    fetchTodosByStatus,
    createTodo,
    updateTodo,
    deleteTodo,
    clearCreateResult,
  };
}; 