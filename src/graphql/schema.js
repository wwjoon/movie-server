import { gql } from "apollo-server";

/* SDL, Schema Definition Language */
export default gql`
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet
    updateTweet(id: ID!, text: String!): Boolean!
    deleteTweet(id: ID!): Boolean!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type User {
    id: ID!
    username: String!
  }
`;
