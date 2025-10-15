import {userResolver} from "./userResolver.js";
import {offerResolver} from "./offerResolver.js";
import {categoryResolver} from "./categoryResolver.js";
import {userOfferResolver} from "./userOfferResolver.js";
import {offerResponseResolver} from "./offerResponseResolver.js";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...offerResolver.Query,
        ...categoryResolver.Query,
        ...userOfferResolver.Query,
        ...offerResponseResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...offerResolver.Mutation,
        ...categoryResolver.Mutation,
        ...userOfferResolver.Mutation,
        ...offerResponseResolver.Mutation,
    }
}