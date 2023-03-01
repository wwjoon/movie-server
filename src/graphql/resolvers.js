import typeDefs from "./schema.js";

let tweets = [
  {
    id: "1",
    text: "first one!",
    userId: "2",
  },
  {
    id: "2",
    text: "second one!",
    userId: "1",
  },
];
let users = [
  {
    id: "1",
    firstName: "Eron",
    lastName: "Musk",
  },
  {
    id: "2",
    firstName: "Gates",
    lastName: "Bill",
  },
];

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
    allUsers() {
      return users;
    },
    allTweets() {
      return tweets;
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
