import { prop, Ref, Typegoose } from "typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "../user/UserEntity";

@ObjectType()
export class Answer extends Typegoose {
  @Field(type => ID)
  readonly _id: ObjectId;

  @prop({ required: true })
  @Field()
  value: string;

  @prop({ ref: User, required: true })
  @Field(type => User)
  author: Ref<User>;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field(() => Date)
  updatedAt: Date;
}

export default new Answer().getModelForClass(Answer, {
  schemaOptions: { timestamps: true }
});
