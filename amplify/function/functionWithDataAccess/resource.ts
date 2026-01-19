import { defineFunction } from '@aws-amplify/backend';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/functions/configure-functions/
 */

export const functionWithDataAccess = defineFunction({
  name: 'functionWithDataAccess',
  resourceGroupName: 'data', // この関数は主にDynamoDBにアクセスするため、dataリソースと同じリソースグループに配置する
  runtime: 20, // useNodejs20.x
});