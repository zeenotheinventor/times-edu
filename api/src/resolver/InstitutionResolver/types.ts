import { Field, InputType } from "type-graphql";

@InputType()
export class CreateInstitutionInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  country: string;

  @Field()
  region: string;
}
