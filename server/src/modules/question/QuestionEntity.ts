import { prop, arrayProp, Ref, Typegoose } from "typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "../user/UserEntity";
import { Answer } from "../answer/AnswerEntity";

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

  @Field(type => [Answer])
  @arrayProp({ itemsRef: Answer, default: [] })
  answers: Ref<Answer>[];

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
