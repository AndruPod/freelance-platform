import {Category, Offer, User, UserOffer} from "../models/models.js";
import ApiError from "../error/ApiError.js";
import {Op} from "sequelize";
import UserOffersService from "../services/userOffersService.js";

export const userOfferResolver = {
    Query: {

        getAllUserOffers: async(_, __, context) => {
            try {
                return await UserOffersService.getAll(context);
            } catch(e) {
                return e;
            }
        },

        // getUserOfferByOfferId: async(_, {id}) => {
        //     try {
        //         return await UserOffersService.getOneById(id);
        //     } catch(e) {
        //         return e;
        //     }
        // }

    },
    Mutation: {}
};