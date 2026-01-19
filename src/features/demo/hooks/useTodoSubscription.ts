import { useEffect } from 'react';
import { client } from '@shared/clients/amplify';
import type { Todo, TodoStatus } from '../types/todo';

interface UseTodoSubscriptionProps {
  statusFilter: TodoStatus;
  editingTodoId: string | null;
  onTodoCreate: (todo: Todo) => void;
  onTodoUpdate: (todo: Todo) => void;
  onTodoDelete: (todo: Todo) => void;
  onEditCancel: () => void;
}

export const useTodoSubscription = ({
  statusFilter,
  editingTodoId,
  onTodoCreate,
  onTodoUpdate,
  onTodoDelete,
  onEditCancel,
}: UseTodoSubscriptionProps) => {
  useEffect(() => {
    const createSub = client.models.Todo.onCreate().subscribe({
      next: (data) => {
        if (data.status === statusFilter) {
          onTodoCreate(data);
        }
      },
    });

    const updateSub = client.models.Todo.onUpdate().subscribe({
      next: (data) => {
        onTodoUpdate(data);
        if (editingTodoId === data.id) {
          onEditCancel();
        }
      },
    });

    const deleteSub = client.models.Todo.onDelete().subscribe({
      next: (data) => {
        onTodoDelete(data);
      },
    });

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }, [statusFilter, editingTodoId, onTodoCreate, onTodoUpdate, onTodoDelete, onEditCancel]);
}; 