import { buildSchema } from "type-graphql";
import { TestResolver } from "../modules/user/test";
import UserResolver from "../modules/user/UserResolver";
import QuestionResolver from "../modules/question/QuestionResolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [TestResolver, UserResolver, QuestionResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.user;
    }
  });
