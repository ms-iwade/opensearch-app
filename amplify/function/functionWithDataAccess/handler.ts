import type { Schema } from '../../data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/functionWithDataAccess';

// Amplify Data クライアントの設定を取得
const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

// Amplifyを設定してDynamoDBへのアクセスを準備
Amplify.configure(resourceConfig, libraryOptions);

// 型安全なDataクライアントを生成
const client = generateClient<Schema>();

/**
 * カスタムミューテーション createCustomTodo のハンドラー
 * フロントエンドから送信されたTodoデータをDynamoDBに保存する
 */
export const handler: Schema["createCustomTodo"]["functionHandler"] = async (event) => {
  try {
    // カスタムミューテーションの引数からTodoデータを取得し、DynamoDBに新規作成
    const newTodo = await client.models.Todo.create({
      content: event.arguments.content || "デフォルトのTodo内容", // Todo内容（必須だがデフォルト値設定）
      status: event.arguments.status || "PENDING", // Todoステータス（未指定時はPENDING）
    });

    // 成功ログを出力
    console.log('Todo created:', newTodo);

    // 成功レスポンスを返却
    return {
      statusCode: 200,
      message: 'Todo created successfully',
      todo: newTodo.data, // 作成されたTodoデータ
    };
  } catch (error) {
    // エラーログを出力
    console.error('Error creating Todo:', error);
    
    // エラーレスポンスを返却
    return {
      statusCode: 500,
      message: 'Error creating Todo',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};