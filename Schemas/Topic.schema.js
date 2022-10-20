const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList} = require("graphql");
const Topic = require("../models/Topics");



const TopicFields = {
    id : {type: GraphQLID },
    type: {type: GraphQLString },
    inTrending: {type: GraphQLBoolean } ,
    interaction:{type: GraphQLInt },
}

const TopicType = new GraphQLObjectType({
    name : 'Topic',
    description:"About all the topics",
    fields : () => ({
      ...TopicFields
    })
})

const TopicQueries = {
    Topics :{
        type: new GraphQLList(TopicType),
        description:"Get Topic",
        resolve () {
           return Topic.find();
        }
    }
}

const TopicMutation = {
    Topics : {
        type : TopicType,
        description:"add Topic",
        args:{
            type: {type: GraphQLString },
            inTrending: {type: GraphQLBoolean } ,
            interaction:{type: GraphQLInt },
        },
        resolve (parent,args){
           return Topic.create({
            type:args.type,
            inTrending:args.inTrending,
            interaction:args.interaction,            
           })
        } 
    }
}

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
    TopicQueries,
    TopicMutation
}