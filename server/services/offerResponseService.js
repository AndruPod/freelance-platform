import ApiError from "../error/ApiError.js";
import {Category, Offer, OfferResponse, User} from "../models/models.js";
import {Op} from "sequelize";

class OfferResponseService {

    // Get all offers that freelancer responded on
    async getAllFreelancerOfferResponses(token) {

        if(!token)
            throw ApiError.badRequest("Token is not provided");

        const userId = token.id;
        const user = await User.findByPk(userId);

        if(token.role === "FREELANCER") {

            const res = await OfferResponse.findAll({
                where: {
                    user_id: userId
                },
                include: [
                    {
                        model: Offer, as: "offer",
                        include: [
                            {model: User, as: "client"},
                            {model: Category, as: "category"}
                        ],
                    },
                    {model: User, as: "user"},
                ]
            });

            return {
                user,
                responses: res,
            };

        }

    }

    // Get all responses that client got from freelancers
    async getAllClientOfferResponses(token) {

        if(!token)
            return ApiError.badRequest("Token is not provided");

        const userId = token.id;

        const offer = await Offer.findAll({
            where: {
                client_id: userId
            },
            attributes: ["id"]
        });

        const offerIds = offer.map(offer => offer.id);

        const res = await OfferResponse.findAll({
            where: {
                offer_id: {
                    [Op.in]: offerIds
                }
            },
            include: [
                {
                    model: Offer, as: "offer",
                    include: [
                        {model: User, as: "client"},
                        {model: Category, as: "category"}
                    ]
                },
                {model: User, as: "user",}
            ]
        });

        return res.map(res => ({
            user: res.user,
            offer: res.offer,
            comment: res.comment
        }));

    }

    // Get responses of one offer for a client
    async getOneOfferResponses(offerId) {

        if(!offerId)
            throw ApiError.badRequest("ID is not provided");

        const offer = await Offer.findOne({
            where: {
                id: offerId
            },
            include: [
                {model: User, as: "client"},
                {model: Category, as: "category"}
            ]
        });

        if(!offer)
            throw ApiError.badRequest("There is no offer found")

        const responses = await OfferResponse.findAll({
            where: {
                offer_id: offerId
            },
            include: [
                {
                    model: Offer, as: "offer",
                    include: [
                        {model: User, as: "client"},
                        {model: Category, as: "category"}
                    ]
                },
                {model: User, as: "user"}
            ]
        });

        if(responses.length === 0)
            throw ApiError.badRequest("There is no responses yet");

        return responses.map(res => ({
            user: res.user,
            offer: res.offer,
            comment: res.comment
        }));

    }

    // Create a new response
    async createOfferResponse(offer, {token}) {

        const user_id = token.id;
        const {offer_id, comment} = offer;

        const candidate = await OfferResponse.findOne({
            where: {
                user_id: user_id,
                offer_id: offer_id
            }
        });

        if(candidate)
            throw ApiError.badRequest("You already have replied for this offer!");

        await OfferResponse.create({
            user_id: user_id,
            offer_id: offer_id,
            comment: comment,
        });

        return await OfferResponse.findOne({
            where: {
                user_id: user_id,
                offer_id: offer_id
            },
            include: [
                {
                    model: Offer, as: "offer",
                    include: [
                        {model: User, as: "client"},
                        {model: Category, as: "category"}
                    ]
                },
                {model: User, as: "user",}
            ]
        });

    }

    // Delete a response
    async deleteOfferResponse(input) {

        const {user_id, offer_id} = input;

        if(!user_id || !offer_id)
            return ApiError.badRequest("ID's are not provided!");

        const candidate = await OfferResponse.findOne({
            where: {
                user_id: user_id,
                offer_id: offer_id
            }
        });

        if(!candidate)
            return ApiError.badRequest("There is no response for this offer yet!");

        await candidate.destroy();
        return true;

    }

}

export default new OfferResponseService();