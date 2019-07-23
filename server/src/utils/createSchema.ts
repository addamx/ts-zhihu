import { buildSchema } from "type-graphql";
import { TestResolver } from "../modules/user/test";
import UserResolver from "../modules/user/UserResolver";
import QuestionResolver from "../modules/question/QuestionResolver";
import AnswerResolver from "../modules/answer/AnswerResolver";
import { UserService } from "../modules/user/UserService";

export const createSchema = () =>
  buildSchema({
    resolvers: [TestResolver, UserResolver, QuestionResolver, AnswerResolver],
    authChecker: async ({ context: { req } }) => {
      if (!req.user) return false;

      const userService = new UserService();
      const user = await userService.findOneById(req.user._id);
      return !!user;
    }
  });
