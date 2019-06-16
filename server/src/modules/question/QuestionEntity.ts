import { prop, Ref, Typegoose } from "typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "../user/UserEntity";

@ObjectType()
export class Question extends Typegoose {
  @Field(type => ID)
  readonly _id: ObjectId;

  @prop({ required: true })
  @Field()
  title: string;

  @prop()
  @Field()
  desc?: string;

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

export default new Question().getModelForClass(Question, {
  schemaOptions: { timestamps: true }
});
