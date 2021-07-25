import { Query, Resolver } from "type-graphql";

@Resolver()
export class InstitutionResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }
}
