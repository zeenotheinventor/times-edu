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

@InputType()
export class UpdateInstitutionInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  region?: string;
}
