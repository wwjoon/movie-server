import { gql } from "apollo-server";

/* SDL, Schema Definition Language */
export default gql`
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet
    updateTweet(id: ID!, text: String!): Boolean!
    """
    Delete a Tweet if found, else return  false
    """
    deleteTweet(id: ID!): Boolean!
  }

  """
  Annotation function check in Apollo Browser
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
`;
