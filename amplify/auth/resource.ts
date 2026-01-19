import { defineAuth } from "@aws-amplify/backend";

/**
 * backend.tsにてオーバーライドするため、ここでは基本設定のみ記述しています。
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
