import { prop, Typegoose } from "typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class User extends Typegoose {
  @Field(type => ID)
  readonly _id: ObjectId;

  @prop({ required: true })
  @Field()
  name: string;

  @prop({ unique: true })
  @Field()
  email: string;

  @prop({ required: true })
  password: string;

  // @prop({ default: false })
  // confirmed: boolean;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field(() => Date)
  updatedAt: Date;

  @Field()
  token: string;
}

export default new User().getModelForClass(User, {
  schemaOptions: { timestamps: true }
});
