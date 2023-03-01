import typeDefs from "./schema.js";

let tweets = [];

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(__, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
  Mutation: {
    postTweet(__, { text, userId }) {
      const newTweet = {
        id: (tweets.length + 1).toString(),
        text,
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
