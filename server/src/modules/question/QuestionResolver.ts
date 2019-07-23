import { Arg, Resolver, Query, Mutation, Ctx, Authorized } from "type-graphql";
import { QuestionService } from "./QuestionService";
import { Question } from "./QuestionEntity";

@Resolver(Question)
export default class QuestionResolver {
  private readonly service: QuestionService;

  constructor() {
    this.service = new QuestionService();
  }

  @Mutation(() => Question)
  @Authorized()
  async createQuestion(@Arg("title") title: string, @Arg("desc") desc: string, @Ctx() ctx: any): Promise<Question> {
    const userId = ctx.req.user._id;

    const question = await this.service.create({ title, desc, author: userId });

    return question;
  }

  @Query(returns => Question, { nullable: true })
  async getQuestionById(@Arg("_id") _id: string) {
    const result = this.service.findOneById(_id);
    return result;
  }
}
