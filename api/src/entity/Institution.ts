import { Field } from "type-graphql";
import { BaseEntity, Column, PrimaryColumn } from "typeorm";

export class Institution extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  region: string;
}
