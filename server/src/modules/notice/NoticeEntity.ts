import { prop, Ref, Typegoose } from "typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "../user/UserEntity";

@ObjectType()
export class Notice extends Typegoose {
  @Field(type => ID)
  readonly _id: ObjectId;

  @prop({ required: true })
  @Field()
  value: string;

  @prop({ default: false })
  @Field()
  readed: boolean;

  @prop({ ref: User, required: true })
  @Field(type => User)
  author: Ref<User>;

  @prop()
  @Field(() => Date)
  createdAt: Date;
}

export default new Notice().getModelForClass(Notice, {
  schemaOptions: { timestamps: true }
});
