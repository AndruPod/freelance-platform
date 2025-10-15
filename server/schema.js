import {UserSchema} from "./schemas/userSchema.js";
import {OfferSchema} from "./schemas/offerSchema.js";
import {UserOfferSchema} from "./schemas/userOfferSchema.js";
import {CategorySchema} from "./schemas/categorySchema.js";

export const typeDefs = `#graphql
${UserSchema}
${OfferSchema}
${UserOfferSchema}
${CategorySchema}
`;