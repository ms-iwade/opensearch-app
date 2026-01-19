import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { functionWithDataAccess } from "../function/functionWithDataAccess/resource";

const schema = a
  .schema({
    Todo: a
      .model({
        content: a.string(),
        status: a.enum(["PENDING", "COMPLETED"]),
        createdAt: a.datetime(),
      })
      .secondaryIndexes((index) => [
        index("status").sortKeys(["createdAt"]).queryField("todosByStatus"),
      ])
      .authorization((allow) => [allow.authenticated()]),

    searchTodos: a
      .query()
      .arguments({
        term: a.string(),
      })
      .returns(a.ref("Todo").array())
      .authorization((allow) => [allow.authenticated()])
      .handler(
        a.handler.custom({
          entry: "./searchTodoResolver.js",
          dataSource: "osDataSource",
        })
      ),

    // カスタムミューテーション
    createCustomTodo: a
      .mutation()
      .arguments({
        content: a.string().required(),
        status: a.enum(["PENDING", "COMPLETED"]),
      })
      .returns(a.json())
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(functionWithDataAccess)),
  })
  .authorization((allow) => [
    allow.resource(functionWithDataAccess).to(["mutate"]),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
