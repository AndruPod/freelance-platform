import ApiError from "../error/ApiError.js";
import {Category, Offer, OfferResponse, User} from "../models/models.js";
import e from "express";
import {Op} from "sequelize";
import OfferResponseService from "../services/offerResponseService.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";

export const offerResponseResolver = {

    Query: {

        getAllFreelancerOfferResponses: async(_, __, {token}) => {
            try {
                return await OfferResponseService.getAllFreelancerOfferResponses(token);
            } catch(e) {
                return e;
            }
        },

        getAllClientOfferResponses: async(_, __, {token}) => {
            try {
                return await OfferResponseService.getAllClientOfferResponses(token);
            } catch(e) {
                return e;
            }
        },

        getOneOfferResponses: checkRole("CLIENT") (async(_, {offerId}) => {
            try {
                return await OfferResponseService.getOneOfferResponses(offerId);
            } catch(e) {
                return e;
            }
        })

    },

    Mutation: {

        createOfferResponse: checkRole("FREELANCER") (async(_, {offer}, context) => {
            try {
                return await OfferResponseService.createOfferResponse(offer, context);
            } catch(e) {
                return e;
            }
        }),

    }
};