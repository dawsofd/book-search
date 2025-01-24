const typeDefs = `
  type User {
    username: String! 
    email: String! 
    password: String! 
    savedBooks: [Book]
    bookCount: Int
    }

  input addUserInput {
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
    
    type Query {
      me: User
    }
        
    type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(input: SaveBookInput!): User
      removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;