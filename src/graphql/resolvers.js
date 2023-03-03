import fetch from "node-fetch";
import typeDefs from "./schema.js";
import data from "./data.js";

let { tweets, users } = data;

const resolvers = {
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
  Query: {
    allMovies() {
      return fetch("https://yts.mx/api/v2/list_movies.json")
        .then((r) => r.json())
        .then((json) => json.data.movies);
    },
    allUsers() {
      return users;
    },
    allTweets() {
      return tweets;
    },
    movie(__, { id: movie_id }) {
      return fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${movie_id}`
      )
        .then((r) => r.json())
        .then((json) => json.data.movie);
    },
    tweet(__, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
  Mutation: {
    postTweet(__, { text, userId }) {
      const user = users.find((user) => user.id === userId);
      if (!user) throw new Error("User Not Found");

      const newTweet = {
        id: (tweets.length + 1).toString(),
        text,
        userId,
      };
      tweets.push(newTweet);

      return newTweet;
    },
    updateTweet(__, { id, text }) {
      let tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;

      tweets = tweets.map((tweet) => {
        if (tweet.id === id) {
          tweet = { ...tweet, text };
        }
        return tweet;
      });

      return true;
    },
    deleteTweet(__, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;

      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
