import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

/**
 * デフォルトのAmplify Dataクライアント
 * 設定されたデフォルト認証モード（userPool）を使用
 */
export const client = generateClient<Schema>();

// 利便性のためのre-export
export { generateClient } from "aws-amplify/data";
export type { Schema };
