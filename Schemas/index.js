const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { TopicQueries, TopicMutation } = require("./Topic.schema");
const { UserMutation } = require("./User.schema");

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Queries",
  fields: () => ({
    ...TopicQueries,
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "Mutations",
  fields: () => ({
    ...TopicMutation,
    ...UserMutation,
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
