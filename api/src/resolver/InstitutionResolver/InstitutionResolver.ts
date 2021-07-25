import { Institution } from "../../entity";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateInstitutionInput, UpdateInstitutionInput } from "./types";

@Resolver()
export class InstitutionResolver {
  @Mutation(() => Institution)
  async createInstitution(
    @Arg("input", () => CreateInstitutionInput) input: CreateInstitutionInput
  ) {
    return await Institution.create(input).save();
  }

  @Query(() => [Institution])
  async institutions() {
    return await Institution.find();
  }

  @Mutation(() => Institution)
  async updateInstitution(
    @Arg("id") id: string,
    @Arg("update", () => UpdateInstitutionInput) update: UpdateInstitutionInput
  ) {
    await Institution.update({ id }, update);
    return Institution.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteInstitution(@Arg("id", () => String) id: string) {
    await Institution.delete({ id });
    return true;
  }
}
