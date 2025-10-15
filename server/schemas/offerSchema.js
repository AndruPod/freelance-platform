export const OfferSchema = `#graphql
    type Offer {
        id: ID!
        title: String!
        description: String!
        client: User!
        category: Category!
        status: String!
    }
    type OfferPagination {
        offers: [Offer!]!
        count: Int!
        totalPages: Int!
        currentPage: Int!
    }
    input OfferInput {
        offer_id: ID
        title: String!
        description: String!
        category_id: ID!
        status: String
    }
    input ChangeStatusInput {
        id: ID!
        status: String!
    }
    input GetAllInput {
        status: String!
        selectedCategories: [Int!]
        limit: Int
        offset: Int!
    }
    type Query {
        getAllOffers(input: GetAllInput!): OfferPagination!
        getOfferById(id: ID!): Offer
        getOffersByStatus(status: String): [Offer!]! #!!!!
    }
    type Mutation {
        addOffer(input: OfferInput!): Offer!
        changeStatus(input: ChangeStatusInput!): Boolean!
        deleteOffer(id: ID!): Boolean!
    }
`