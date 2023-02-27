import { ApolloServer, gql } from "apollo-server";

/* SDL, Schema Definition Language */
const typeDefs = gql`
  type Query {
    id: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
