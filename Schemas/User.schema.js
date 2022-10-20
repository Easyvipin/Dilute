const { GraphQLNonNull } = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const User = require("../models/Users");
const { signUpResolver, signInResolver } = require("../resolvers/userResolver");

const UserFields = {
  id: { type: GraphQLID },
  userName: { type: GraphQLString },
  createdAt: { type: GraphQLDateTime },
  updatedAt: { type: GraphQLDateTime },
};

const UserType = new GraphQLObjectType({
  name: "User",
  description: "About user",
  fields: () => ({
    ...UserFields,
  }),
});

const UserMutationType = new GraphQLObjectType({
  name: "UserMutation",
  description: "About user",
  fields: () => ({
    ...UserFields,
    jwtToken: { type: GraphQLString },
  }),
});

const UserQueries = {
  User: {
    type: UserType,
    description: "Get User",
    args: {
      id: { type: GraphQLID },
    },
    resolve(parent, args) {
      return User.findById(args.id);
    },
  },
  Users: {
    type: new GraphQLList(UserType),
    description: "Get all the Users",
    resolve() {
      return User.find();
    },
  },
};

const UserMutation = {
  signup: {
    type: UserMutationType,
    description: "Sign up the user for firs time",
    args: {
      userName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return signUpResolver(parent, args);
    },
  },
  signin: {
    type: UserMutationType,
    description: "Signing in the existing User",
    args: {
      userName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return signInResolver(parent, args);
    },
  },
};

/* 
async function seedTopic(){
    const newTopic = await Topic.create({
        type:"meme",
        inTrending:false
    })
} 

seedTopic();
 */

module.exports = {
  UserQueries,
  UserMutation,
};
