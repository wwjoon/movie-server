import typeDefs from "./schema.js";

const resolvers = {
  Query: {
    tweet() {
      console.log("I'm called");
      return null;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
