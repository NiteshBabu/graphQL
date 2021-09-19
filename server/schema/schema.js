const graphql = require("graphql")
const _ = require("lodash")
const { 
  GraphQLObjectType, 
  GraphQLString , 
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql


// dummy data for DB
let Songs = [
  {id : "1", name : "Willow", genre : "Pop", singerId : "1"},
  {id : "2", name : "Sing", genre : "Pop", singerId : "1"},
  {id : "3", name : "Beggin", genre : "Metal", singerId : "1"},
  {id : "4", name : "Back To You", genre : "Pop", singerId : "1"},
]

let Singers = [
  {id : "1", name : "Taylor Swift", worth : 1000000},
  {id : "2", name : "Manekin", worth : 30000},
  {id : "3", name : "Ed Sheeran", worth : 20000},
  {id : "4", name : "Selena Gomez", worth : 20000},
]


const SongType = new GraphQLObjectType({
  name : "Song",
  fields : () => ({
    id : { type : GraphQLID},
    name : { type : GraphQLString},
    genre : { type : GraphQLString},
    singer : {
      type : SingerType,
      resolve(parent, args){
        return _.find(Singers, {id : parent.singerId})
      }
    }
  })
})

const SingerType = new GraphQLObjectType({
  name : "Singer",
  fields : {
    id : { type : GraphQLID},
    name : { type : GraphQLString},
    worth : { type : GraphQLInt},
    songs : {
      type : new GraphQLList(SongType),
      resolve(parent, args){
        return _.filter(Songs, {singerId : parent.id})
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name : "RootQuery",
  fields : {
    
    Song : {
      type : SongType,
      args : { id : {type : GraphQLID}},
      resolve(parent, args){
        // code to fetch data here, from DB.
        return _.find(Songs, {id : args.id})
      }
    },

    Singer : {
      type : SingerType,
      args : { id : {type : GraphQLID}},
      resolve(parent, args){
        return _.find(Singers, {id : args.id})
      }
    },

    Songs : {
      type : new GraphQLList(SongType),
      resolve(parent, args){
        return Songs
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query : RootQuery
})

