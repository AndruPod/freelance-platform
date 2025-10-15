export const UserOfferSchema = `#graphql
    type UserOffer {
        user_id: ID!
        username: String!
        role: String!
        offers: [Offer]!
    }
    type Query {
        getAllUserOffers: UserOffer
#        getUserOfferByOfferId(offer_id: ID!): UserOffer
    }
`