import server from "./server.js";

server.listen().then(({ url }) => {
  console.log(`Running on ${url} 🚀 `);
});
