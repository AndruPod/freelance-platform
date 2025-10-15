export const CategorySchema = `#graphql
    type Category {
        id: ID!
        name: String!
    }
    input CategoryInput {
        id: ID!
        name: String!
    }
    type Query {
        getAllCategories: [Category]
        getCategoryById(id: ID!): Category
    }
    type Mutation {
        addCategory(name: String!): Category!
        updateCategory(input: CategoryInput!): Boolean!
        deleteCategory(id: ID!): Boolean!
    }
`