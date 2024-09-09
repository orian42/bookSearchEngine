const typeDefs = `
    
    type User {
        _id: String!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: String!
        user: User!
    }

    type Query {
        me: User!
    }

    input SaveBookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: SaveBookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;