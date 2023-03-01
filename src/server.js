import { ApolloServer } from "apollo-server";
import config from "./graphql/resolvers.js";

export default new ApolloServer({ ...config });
