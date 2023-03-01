import { ApolloServer } from "apollo-server";
import a from "./graphql/resolvers.js";

export default new ApolloServer({ ...a });
