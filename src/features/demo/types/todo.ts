import { type Schema } from '@shared/clients/amplify';

export type Todo = Schema['Todo']['type'];
export type TodoStatus = 'PENDING' | 'COMPLETED';
export type CreateMethod = 'direct' | 'lambda';

export interface TodoFormData {
  content: string;
  status: TodoStatus;
}

export interface EditingState {
  todoId: string | null;
  content: string;
  status: TodoStatus;
} 