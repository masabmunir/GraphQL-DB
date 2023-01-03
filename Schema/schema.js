const graphql = require('graphql');
const _= require('lodash');
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = graphql;


let books=[
    {name:'Avengers',genre:'Action',id:1,authorId:'1'},
    {name:'Supermen',genre:'War',id:2,authorId:'2'},
    {name:'End Games',genre:'Drama',id:3,authorId:'3'},
    {name:'Batman',genre:'Action',id:3,authorId:'2'},
    {name:'World war',genre:'Drama',id:3,authorId:'3'},
    {name:'Sherlock',genre:'Drama',id:3,authorId:'3'},

]

let authors = [
    {name:'James Smith',age:33,id:1},
    {name:'Micheal Jorden',age:44,id:2},
    {name:'Bred pit',age:55,id:3},
]
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return _.find(authors,(parent.authorId));
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
           type:BookType,
           args:{id:{type:GraphQLID}},
           resolve(parent,args){
            console.log(typeof(args.id))
             return _.find(books,{id:args.id})  // code to get data from db or other source 
           } 
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(author,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
              return books;
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})