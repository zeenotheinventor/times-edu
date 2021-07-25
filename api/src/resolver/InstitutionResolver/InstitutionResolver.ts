import { Institution } from "../../entity";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateInstitutionInput } from "./types";

@Resolver()
export class InstitutionResolver {
  @Mutation(() => Institution)
  async createInstitution(
    @Arg("input", () => CreateInstitutionInput) input: CreateInstitutionInput
  ) {
    return await Institution.create(input).save();
  }

  @Query(() => String)
  hello() {
    return "hi!";
  }
}
