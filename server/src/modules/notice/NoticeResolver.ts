import { Arg, Resolver, Query, Mutation, Ctx, Authorized } from "type-graphql";
import { NoticeService } from "./NoticeService";
import { Notice } from "./NoticeEntity";

@Resolver(Notice)
export default class NoticeResolver {
  private readonly service: NoticeService;

  constructor() {
    this.service = new NoticeService();
  }

  @Mutation(() => Notice)
  @Authorized()
  async createNotice(@Arg("value") value: string, @Ctx() ctx: any): Promise<Notice> {
    const userId = ctx.req.user._id;

    const question = await this.service.create({ value, author: userId });

    return question;
  }

  @Query(returns => Notice, { nullable: true })
  async getNoticeById(@Arg("_id") _id: string) {
    const result = this.service.findOneById(_id);
    return result;
  }
}
