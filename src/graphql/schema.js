import { gql } from "apollo-server";

/* SDL, Schema Definition Language */
export default gql`
  type Query {
    allMovies: [Movie!]!
    allUsers: [User!]!
    allTweets: [Tweet!]!
    movie(id: String!): Movie
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
  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }
`;
