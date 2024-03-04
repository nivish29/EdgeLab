const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Define GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
  }
`);

// Sample data
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", age: 30 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", age: 25 },
];

// Define resolver functions
const root = {
  hello: () => "Hello, GraphQL!",
  users: () => users, // Return the entire users array
  user: ({ id }) => users.find((user) => user.id === id),
};


// Set up the GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Allow POST requests on the /graphql endpoint
app.post('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GraphQL server is running on http://localhost:${PORT}/graphql`);
});
