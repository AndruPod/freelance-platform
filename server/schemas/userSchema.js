export const UserSchema = `#graphql
    type User {
        id: ID!
        username: String!
        password: String!
        role: String!
        offers: [Offer!]!
        userOffers: [UserOffer!]!
    }
    input UserInput {
        id: ID
        username: String!
        password: String!
        role: String
    }
    input CheckAuthInput {
        id: ID!
        username: String!
        role: String!
    }
    type Token {
        token: String!
    }
    input UpdateUserInput {
        id: ID!
        role: String!
    }
    type Query {
        getAllUsers: [User]
        getUserById(id: ID!): User
        getUsersByRole(role: String!): [User]
        checkAuth: Token!
    }
    type Mutation {
        login(input: UserInput!): Token!
        register(input: UserInput!): Token!
        updateRole(input: UpdateUserInput!): Boolean!
        deleteUser(id: ID!): Boolean!
    }
`