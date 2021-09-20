const graphql = require("graphql")
const _ = require("lodash")
const { 
  GraphQLObjectType, 
  GraphQLString , 
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql

// DB Models
const Song = require('../model/Song')
const Singer = require('../model/Singer')


const SongType = new GraphQLObjectType({
  name : "Song",
  fields : () => ({
    id : { type : GraphQLID},
    name : { type : GraphQLString},
    genre : { type : GraphQLString},
    singerId : { type : GraphQLString},
    singer : {
      type : SingerType,
      resolve(parent, args){
        return Singer.findById(parent.singerId)
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
        return Song.find({singerId : parent.id})
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
        return Song.findById(args.id)
      }
    },

    Singer : {
      type : SingerType,
      args : { id : {type : GraphQLID}},
      resolve(parent, args){
        return Singer.findById(args.id)
      }
    },
    
    Songs : {
      type : new GraphQLList(SongType),
      resolve(parent, args){
        return Song.find();
      }
    },
    
    Singers : {
      type : new GraphQLList(SingerType),
      resolve(parent, args){
        return Singer.find();
      }
    }
  }
})


const Mutation = new GraphQLObjectType({
  name : "Mutation",
  fields : {

    newSong :
    {
      type : SongType,
      args : {
        name : {type : new GraphQLNonNull(GraphQLString)}, 
        genre :{type : new GraphQLNonNull(GraphQLString)},
        singerId :{type : GraphQLID}
      },
      resolve(parent, args){
        const song = new Song({...args})
        return song.save()
      }
    },


    newSinger :
    {
      type : SingerType,
      args : {
        name : {type : new GraphQLNonNull(GraphQLString)}, 
        worth : {type : new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        const singer = new Singer({...args})
        return singer.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query : RootQuery,
  mutation : Mutation,
})

