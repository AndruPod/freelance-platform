import {Category, Offer, User, UserOffer} from "../models/models.js";
import {Op} from "sequelize";
import ApiError from "../error/ApiError.js";

class UserOffersService {

    // Get all user offers
    async getAll(context) {

        const {token} = context;
        let offers;

        if(!token)
            throw ApiError.badRequest("Unauthorized");

        if(token) {

            let offerIds = [];
            const userOffers = await UserOffer.findAll({
                raw: true,
                where: {user_id: token.id}
            });

            userOffers.map((offer) => {
                offerIds.push(offer.offer_id);
            });

            offers = await Offer.findAll({
                where: {
                    id: {
                        [Op.in]: offerIds,
                    }
                },
                include: [
                    { model: User, as: 'client' },
                    { model: Category, as: 'category', attributes: ['id', 'name'] }
                ]
            });
        }

        if(offers.length === 0)
            throw ApiError.badRequest("No offers found");

        const user = await User.findOne({where: {id: token.id}});

        return {
            user_id: user.id,
            username: user.username,
            role: user.role,
            offers: offers
        };

    }

    // Get one user offer by ID
    async getOneById(id) {

        if(!id)
            throw ApiError.internal("ID should be provided");

        const candidate = await UserOffer.findOne({raw: true, where: {offer_id: id}});

        if(!candidate)
            throw ApiError.badRequest("No offer found");

        const user = await User.findOne({where: {id: candidate.user_id}});
        const offer = await Offer.findAll({
            where: {id},
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name'] }
            ]
        });

        return {
            id: user.id,
            username: user.username,
            role: user.role,
            offers: offer
        };

    }

}

export default new UserOffersService();