import { Arg, Resolver, Query, Mutation, Ctx, Authorized } from "type-graphql";
import { AnswerService } from "./AnswerService";
import { QuestionService } from "../question/QuestionService";
import { Answer } from "./AnswerEntity";

@Resolver(Answer)
export default class AnswerResolver {
  private readonly service: AnswerService;
  private readonly questionService: QuestionService;

  constructor() {
    this.service = new AnswerService();
    this.questionService = new QuestionService();
  }

  @Mutation(() => Answer)
  @Authorized()
  async createAnswer(@Arg("value") value: string, @Arg("questionId") questionId: string, @Ctx() ctx: any): Promise<Answer> {
    const userId = ctx.req.user._id;

    const question = await this.questionService.findOneById(questionId);
    if (!question) {
      throw new Error("Invalid Question ID");
    }

    const answer = await this.service.create({ value, author: userId });
    (question.answers as Answer[]).push(answer);
    await question.save();

    return answer;
  }

  @Query(returns => Answer, { nullable: true })
  async getAnswerById(@Arg("_id") _id: string) {
    const result = await this.service.findOneById(_id);
    return result;
  }
}
