import "reflect-metadata";
import Express from "express";
import cors from "cors";
import jwt from "express-jwt";
import mongoose from "mongoose";
import { MONGO_PORT, MONGO_HOST, MONGO_DB_NAME, MONGO_DB_USER, MONGO_DB_PASSWORD, SECRET } from "./loader/config";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./utils/createSchema";
// import queryComplexity, {simpleEstimator, fieldConfigEstimator} from 'graphql-query-complexity';

const main = async () => {
  await mongoose.connect(
    `mongodb://${MONGO_DB_USER + ":" || ""}${MONGO_DB_PASSWORD || ""}@${MONGO_HOST || "localhost"}:${MONGO_PORT}/${MONGO_DB_NAME}`,
    { useNewUrlParser: true }
  );

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res
    })
    // validationRules: [
    //   queryComplexity({
    //     // The maximum allowed query complexity, queries above this threshold will be rejected
    //     maximumComplexity: 8,
    //     // The query variables. This is needed because the variables are not available
    //     // in the visitor of the graphql-js library
    //     variables: {},
    //     // Optional callback function to retrieve the determined query complexity
    //     // Will be invoked weather the query is rejected or not
    //     // This can be used for logging or to implement rate limiting
    //     onComplete: (complexity: number) => {
    //       console.log("Query Complexity:", complexity);
    //     },
    //     estimators: [
    //       // Using fieldConfigEstimator is mandatory to make it work with type-graphql
    //       fieldConfigEstimator(),
    //       // This will assign each field a complexity of 1 if no other estimator
    //       // returned a value. We can define the default value for field not explicitly annotated
    //       simpleEstimator({
    //         defaultComplexity: 1
    //       })
    //     ]
    //   }) as any
    // ]
  });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "http://0.0.0.0:3301"
    })
  );

  app.use(jwt({ secret: SECRET, credentialsRequired: false, userProperty: 'user' }));

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(3302, () => {
    console.log("server started on http://0.0.0.0:3302/graphql");
  });
};

main().catch(err => console.error(err));
