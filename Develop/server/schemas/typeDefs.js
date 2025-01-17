const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type: Query {
        me: User
    }
        
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: saveBookInput!): User
        removeBook(bookId: ID!): User
    }
        
    type User {
    username: String! 
    email: String! 
    password: String! 
    savedBooks: [Book]
    bookCount: Int
    }

input CreateUserInput {
    username: String!
    email: String! 
    password: String! 
}

input LoginInput {
    email: String! 
    password: String!
}

    type Book {
    authors: [String]
    description: String!
    bookId: String! 
    image: String
    link: String
    title: String!
    }

    type Auth {
        token: ID!
        user: User
    }
    
    input SaveBookInput {
        authors: [String]
        description: String
        title: String
        bookId: ID
        image: String
        link: String
    }
`;

module.exports = typeDefs;