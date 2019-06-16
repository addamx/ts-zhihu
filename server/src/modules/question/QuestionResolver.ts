import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { QuestionService } from "./QuestionService";
import { UserService } from "../user/UserService";
import { Question } from "./QuestionEntity";

@Resolver(Question)
export default class QuestionResolver {
  private readonly service: QuestionService;
  private readonly userService: UserService;

  constructor() {
    this.service = new QuestionService();
    this.userService = new UserService();
  }

  @Mutation(() => Question)
  async createQuestion(@Arg("title") title: string, @Arg("desc") desc: string, @Ctx() ctx: any): Promise<Question> {
    const userId = ctx.req.user._id;
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new Error("Invalid User ID");
    }

    const question = await this.service.create({ title, desc, author: userId });
    (user.questions as Question[]).push(question);
    await user.save();

    return question;
  }

  @Query(returns => Question, { nullable: true })
  async getQuestionById(@Arg("_id") _id: string) {
    return await this.service.findOneById(_id);
  }
}
