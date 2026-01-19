import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const term = ctx.args.term;

  const body = term
    ? {
        query: {
          multi_match: {
            query: term,
            fields: ["content", "status"],
          },
        },
      }
    : {
        query: {
          match_all: {},
        },
      };

  return {
    operation: "POST",
    path: "/todo/_search",
    params: {
      body,
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return ctx.result.hits.hits.map((hit) => hit._source);
}
