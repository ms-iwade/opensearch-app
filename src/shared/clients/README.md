# Shared Clients

複数のfeatureから横断的に使われるAPIクライアントです。

## Amplify Client

AWS Amplify のクライアント設定です。

### 使用方法

#### 基本的な使用方法

```typescript
import { client } from '@shared/clients/amplify';

// Todoの取得
const fetchTodos = async () => {
  const { data: todos, errors } = await client.models.Todo.list();
  if (errors) {
    console.error('Error fetching todos:', errors);
    return;
  }
  return todos;
};

// Todoの作成
const createTodo = async (content: string) => {
  const { data: todo, errors } = await client.models.Todo.create({
    content,
  });
  if (errors) {
    console.error('Error creating todo:', errors);
    return;
  }
  return todo;
};
```

#### 型安全性

クライアントは TypeScript で型安全に使用できます：

```typescript
import type { Schema } from '@shared/clients/amplify';

type Todo = Schema['Todo']['type'];
``` 