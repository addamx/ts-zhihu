import { Arg, Resolver, Query, Authorized, Mutation, Ctx, UseMiddleware } from "type-graphql";
import { logger } from "../../middleware/logger";
import jwt from "jsonwebtoken";
import { SECRET } from "../../loader/config";
import { MyContext } from "src/types/MyContext";
import { UserService } from "./UserService";
import { User } from "./UserEntity";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./inputType/RegisterInput";

@Resolver(User)
export default class UserResolver {
  private readonly service: UserService;

  constructor() {
    this.service = new UserService();
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("email") email: string, @Arg("password") password: string, @Ctx() ctx: MyContext): Promise<User | null> {
    const user = await this.service.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }

    user.token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      SECRET,
      { expiresIn: "7d" }
    );

    return user;
  }

  @UseMiddleware(logger)
  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    name,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.service.create({ name, email, password: hashedPassword });

    // await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }

  @Query(returns => User, { nullable: true })
  @Authorized()
  async me(@Ctx() ctx: any) {
    if (ctx.req.user && ctx.req.user._id) {
      return await this.service.findOneById(ctx.req.user._id);
    }
  }
}
