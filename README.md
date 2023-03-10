# ๐ฅ movie-server

## โก Technical Skills

<div>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white">
    <img src="https://img.shields.io/badge/Apollo-311C87?style=flat&logo=apollographql&logoColor=white">
</div>

## ๐ Table of Contents

- [Why GraphQL?](#1)
- [Apollo Server](#2)
- [Scalar Type](#3)
- [Mutations](#4)
- [Non-null](#5)
- [Resolver](#6)
- [Docstring](#7)
- [Reference](#reference)

## <a name="1"></a>Why GraphQL?

Facebook์ ๋ชจ๋ฐ์ผ ์ฑ์ 2012๋๋ถํฐ GraphQL๋ก ๊ตฌ๋๋์์ต๋๋ค.
GraphQL์ spec์ 2015๋ ์คํ์์ค๋ก ๊ณต๊ฐ๋์์ผ๋ฉฐ, ํ์ฌ ํ์ด์ค๋ถ, ๊นํ๋ธ, ํํฐ๋ ์คํธ, Shopify ๋ฑ์์ ์ฌ์ฉํ๊ณ  ์์ต๋๋ค.

### over-fetching

```json
movie {
    id: 11,
    title: "SpiderMan",
    summary: "SpiderMan is back"
    ...
}
```

์ํ์ ๋ํ ์ ๋ณด์ title๋ง ๋ณด์ฌ์ฃผ๋ ์ฑ์ ์ ์ํ๋ค ๊ฐ์ ํ๊ณ 
REST API๋ฅผ fetchingํ๋ฉด id, title, summary... ๋ฑ ๋ชจ๋  ์ ๋ณด๋ฅผ ๋ฐ๊ฒ ๋ฉ๋๋ค.

๋ด๊ฐ ํ์ํ ์ ๋ณด๋ title์ธ๋ฐ ๋ค๋ฅธ ๋ชจ๋  ์ ๋ณด๋ฅผ ๋ถ๋ฌ์ค๊ฒ๋๋ ๊ฒ์ over-fetching ์ด๋ผ๊ณ  ํฉ๋๋ค.
GraphQL์ ์ฌ์ฉํ๋ฉด API์ GraphQL ์ฟผ๋ฆฌ๋ฅผ ๋ณด๋ด๊ณ  ํ์ํ ๊ฒ๋ง ์ ํํ ์ป์ ์ ์์ต๋๋ค.

> Ask for what you need, get exactly that<br/>
>
> Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server.

### under-fetching

ํ์ํ ๋ฐ์ดํฐ๋ณด๋ค ์ ์ ๋ฐ์ดํฐ๋ฅผ fetchํ๋ ๊ฒ์ ๋งํฉ๋๋ค.

์ผ๋ฐ์ ์ธ REST API๋ ์ฌ๋ฌ URL์์ ๋ก๋ฉํด์ผ ํฉ๋๋ค.
ํ์ง๋ง GraphQL API๋ ์ฑ์ ํ์ํ ๋ชจ๋  ๋ฐ์ดํฐ๋ฅผ ๋จ์ผ request๋ก ๊ฐ์ ธ์ต๋๋ค.
GraphQL์ ์ฌ์ฉํ๋ ์ฑ์ ๋๋ฆฐ ๋ชจ๋ฐ์ผ ๋คํธ์ํฌ ์ฐ๊ฒฐ์์๋ ๋น ๋ฅผ ์ ์์ต๋๋ค.

> Get many resources in a single request<br/>
>
> GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.

## <a name="2"></a>Apollo Server

Apollo ์๋ฒ๋ Apollo ํด๋ผ์ด์ธํธ๋ฅผ ํฌํจํ
๋ชจ๋  GraphQL ํด๋ผ์ด์ธํธ์ ํธํ๋๋์ฌ์ ์ค์์ ์คํ ์์ค GraphQL ์๋ฒ์๋๋ค.

๋ชจ๋  ์์ค์ ๋ฐ์ดํฐ๋ฅผ ์ฌ์ฉํ  ์ ์๋ ์์ฒด ๋ฌธ์ํ ๊ฐ๋ฅํ
production-ready GraphQL API๋ฅผ ๊ตฌ์ถํ๋ ๊ฐ์ฅ ์ข์ ๋ฐฉ๋ฒ์๋๋ค.

```zsh
npm i apollo-server graphql
```

๋ชจ๋  GraphQL ์๋ฒ๋ ์คํค๋ง๋ฅผ ์ฌ์ฉํ์ฌ ํด๋ผ์ด์ธํธ๊ฐ ์ฟผ๋ฆฌํ  ์ ์๋ ๋ฐ์ดํฐ ๊ตฌ์กฐ๋ฅผ ์ ์ํฉ๋๋ค.

```js
const typeDefs = gql`
  type Query {
    text: String
    hello: String
  }
`;

const server = new ApolloServer({ typeDefs });
```

## <a name="3"></a>Scalar Type

```js
const typeDefs = gql`
  type User {
    id: ID
    username: String
  }
  type Tweet {
    id: ID
    text: String
    author: User
  }
  type Query {
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }
`;
```

GraphQL ๊ฐ์ฒด์๋ ์ด๋ฆ๊ณผ ํ๋๊ฐ ์์ง๋ง, ์ด๋ฌํ ํ๋๋ ๊ตฌ์ฒด์ ์ธ ๋ฐ์ดํฐ๋ก ํด์๋์ด์ผ ํฉ๋๋ค.
Scalar Type์ ์ฟผ๋ฆฌ์ ์์ ๋ํ๋๋๋ค.

์ ์ฟผ๋ฆฌ์์๋ `User`์ `id, username`, `Tweet`์ `id, text` ํ๋๊ฐ Scalar Type ์๋๋ค.

> - Int: A signed 32โbit integer.
>
> - Float: A signed double-precision floating-point value.
>
> - String: A UTFโ8 character sequence.
>
> - Boolean: true or false.
>
> - ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be humanโreadable.

## <a name="4"></a>Mutations

GraphQL์ ๋ํ ๋๋ถ๋ถ์ ๋ผ์๋ ๋ฐ์ดํฐ fetching์ ์ค์ ์ ๋์ง๋ง
์์ ํ ๋ฐ์ดํฐ ํ๋ซํผ์ ์๋ฒ ์ธก ๋ฐ์ดํฐ๋ ์์ ํ  ์ ์๋ ๋ฐฉ๋ฒ ์ด ํ์ํฉ๋๋ค.

๊ธฐ์ ์ ์ผ๋ก Query๋ก ๋ฐ์ดํฐ ์์ ์ ์ ๋ฐํ  ์ ์์ต๋๋ค.
๊ทธ๋ฌ๋ ๋ฐ์ดํฐ ์์ ์ ์ ๋ฐํ๋ ๋ชจ๋  ์์์ mutation์ ํตํด ๋ช์์ ์ผ๋ก ๋ณด๋ด์ผํ๋ค๋ ๊ท์น์ ์ค์ ํ๋ ๊ฒ์ด ์ ์ฉํฉ๋๋ค.

```js
type Mutation {
  postTweet(text: String, userId: ID): Tweet
}
```

## <a name="5"></a>Non-null

```js
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

name์ String ํ์์ ์ฌ์ฉํ๊ณ  ํ์ ๋ค์ ๋๋ํ๋ฅผ ์ถ๊ฐํด์ `null`์ด ์๋ ๊ฒ์ผ๋ก ํ์ํฉ๋๋ค.

`!`๋ ์๋ฒ๊ฐ ํญ์ ์ด ํ๋์ ๋ํด null์ด ์๋ ๊ฐ์ ๋ฐํํ  ๊ฒ์ผ๋ก ์์ํ๊ณ  ์ค์ ๋ก null ๊ฐ์ ์ป๊ฒ๋๋ฉด ํด๋ผ์ด์ธํธ์๊ฒ ๋ฌธ์ ๊ฐ ๋ฐ์ํ์์ ์๋ฆฝ๋๋ค.

## <a name="6"></a>Resolver

Data Set(TypeDefs)๋ฅผ ์ ์ํ์ง๋ง, Apollo Server๋ query๋ฅผ ์คํํ  ๋๋ง๋ค ํด๋น Data Set์ ์ฌ์ฉํด์ผํ๋ค๋ ๊ฒ์ ๋ชจ๋ฆ๋๋ค. ์ด ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด Resolver๋ฅผ ๋ง๋ญ๋๋ค.

Resolver๋ Apollo Server์ ํน์  type๊ณผ ๊ด๋ จ๋ ๋ฐ์ดํฐ๋ฅผ ์ด๋ป๊ฒ fetchํ๋์ง ์๋ ค์ค๋๋ค.

```js
const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(_, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
```

Resolver์ ์ฒซ๋ฒ์งธ ๋งค๊ฐ๋ณ์๋ root, ๋๋ฒ์งธ ๋งค๊ฐ๋ณ์๋ args๋ก args์์ ์ ์ํ ๋งค๊ฐ๋ณ์๋ฅผ ๊ฐ์ ธ์ฌ ์ ์์ต๋๋ค.

[Resolver arguments ๐](https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-arguments)

> - parent: The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).<br/>For resolvers of top-level fields with no parent (such as fields of Query), this value is obtained from the rootValue function passed to Apollo Server's constructor.
>
> - args: An object that contains all GraphQL arguments provided for this field.<br/>For example, when executing query{ user(id: "4") }, the args object passed to the user resolver is { "id": "4" }.
>
> - context: An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers.
>
> - info: Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.<br/>Its core fields are listed in the GraphQL.js source code. Apollo Server extends it with a cacheControl field.

## <a name="7"></a>Docstring

type, field, argument์ ๋ํ ์ค๋ช์ ์ ๊ณตํฉ๋๋ค. Docstrings๋ ์๋์ผ๋ก ๋ง์ ์ผ๋ฐ์ ์ธ GraphQL tools์ ๋ํ๋ฉ๋๋ค.

```js
"""
Description for the User
"""
type User {
  """
  Description for first Name
  """
  firstName: String!

  age(
    """
    Must be an integer
    """
    arg: Int
  )
}
```

## <a name="reference"></a>Reference

https://nomadcoders.co/graphql-for-beginners

https://github.com/Lecture-Summary
