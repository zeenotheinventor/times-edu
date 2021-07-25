import { graphql } from "graphql";
import { schema } from "../resolver";
export const fireGraphQLCall = async (query: string, variables?: any) => {
  return graphql(schema, query, undefined, undefined, variables);
};
