import { buildSchemaSync } from "type-graphql";
import { InstitutionResolver } from "./InstitutionResolver";

export { InstitutionResolver } from "./InstitutionResolver";

export const schema = buildSchemaSync({
  resolvers: [InstitutionResolver],
  emitSchemaFile: true,
});
