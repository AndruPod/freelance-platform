import ApiError from "../error/ApiError.js";
import {Op} from "sequelize";
import {Category, Offer, OfferResponse, User, UserOffer} from "../models/models.js";

class OfferService {

    // QUERIES

    async getAll(input) {

        const {status, selectedCategories = [], limit = 9, offset = 0} = input;

        const whereClause = {status};

        if(selectedCategories.length > 0) {
            if(!Array.isArray(selectedCategories) || selectedCategories.some(id => typeof id !== 'number')) {
                throw ApiError.badRequest('Selected categories should be an array of numbers');
            }
            whereClause.category_id = {[Op.in]: selectedCategories};
        }

        const {count, rows} = await Offer.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            include: [
                {model: Category, as: 'category'},
                {model: User, as: 'client'}
            ]
        });

        return {
            offers: rows,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: Math.floor(offset / limit) + 1
        };

    }

    async getOneByID(id) {

        if(!id)
            throw ApiError.badRequest("Offer ID should be provided");

        const candidate = await Offer.findOne({
            // raw: true,
            where: {id},
            include: [
                {model: User, as: 'client'},
            ]
        });

        if(!candidate)
            throw ApiError.badRequest("No offer found");

        const category = await Category.findOne({raw: true, where: {id: candidate.category_id},});

        return {
            id: candidate.id,
            title: candidate.title,
            description: candidate.description,
            status: candidate.status,
            client: candidate.client,
            category: {
                id: category.id,
                name: category.name,
            }
        };

    }

    // MUTATIONS

    async add(input, token) {

        const {title, description, category_id} = input;

        if(!token)
            throw ApiError.badRequest("Unauthorized");

        if(!title || !description || !category_id)
            throw ApiError.badRequest("You should provide all the information!");

        const candidate = await Offer.findOne({where: {title: title, description: description}});

        if(candidate)
            throw ApiError.badRequest("This offer already exists!");

        const offer = await Offer.create({title, description, category_id, client_id: token.id}, {raw: true});
        await UserOffer.create({user_id: token.id, offer_id: offer.id});
        return offer;

    }

    async changeStatus(input) {

        const {id, status} = input;

        if(!id)
            throw ApiError.badRequest("ID should be provided")
        if(!status)
            throw ApiError.badRequest("New status should be provided");

        const candidate = await Offer.findOne({where: {id}});

        if(!candidate)
            throw ApiError.badRequest("No offer found");

        await Offer.update({status: status}, {where: {id}});
        return true;

    }

    async remove(id) {

        if(!id)
            throw ApiError.badRequest("There is no offer");

        const deletedOfferResponses = await OfferResponse.destroy({where: {offer_id: id}});
        const deletedUserOffer = await UserOffer.destroy({where: {offer_id: id}});
        const deleted = await Offer.destroy({where: {id}});

        if(deleted === 0 || deletedUserOffer === 0 || deletedOfferResponses === 0)
            throw ApiError.badRequest("No offer has been deleted!");

        return true;

    }

}

export default new OfferService();