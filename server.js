const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const expressPlayground =
  require("graphql-playground-middleware-express").default;
const bodyParser = require("body-parser");
const connectDb = require("./config/db.config");
const { isAuthenticated } = require("./middlewares/auth");
const schema = require("./Schemas");

require("dotenv").config();

var app = express();

connectDb();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/graphql",
  isAuthenticated,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    formatError(err) {
      // <-- log the error
      return {
        message: err.message,
        code: err.originalError && err.originalError.code, // <--
        locations: err.locations,
        path: err.path,
      };
    },
  })
);

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
