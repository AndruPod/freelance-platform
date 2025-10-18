export const OfferResponseSchema = `#graphql
type ClientResponses {
    user: User!
    offer: Offer!
    comment: String!
}
type OfferResponse {
    offer: Offer
    comment: String!
}
type FreelancerOfferResponses {
    user: User!
    responses: [OfferResponse!]!
}
type OneOfferResponses {
    offer: Offer!
    responses: [ClientResponses!]!
}
input OfferResponseInput {
    offer_id: ID!
    comment: String!
}
input DeleteOfferResponseInput {
    user_id: ID!
    offer_id: ID!
}
type Query {
    getAllFreelancerOfferResponses: FreelancerOfferResponses!
    getAllClientOfferResponses: [ClientResponses!]!
    getOneOfferResponses(offerId: ID!): [ClientResponses]!
}
type Mutation {
    createOfferResponse(offer: OfferResponseInput!): OfferResponse!
    deleteOfferResponse(input: DeleteOfferResponseInput!): Boolean!
}
`