import {Category} from "../models/models.js";
import ApiError from "../error/ApiError.js";

class CategoryService {

    // QUERIES

    async getAll() {
        return await Category.findAll()
    }

    async getOneById(id) {

        if(!id) throw ApiError.badRequest("Category ID should be provided");

        const candidate = await Category.findOne({where: {id}});

        if(!candidate) throw ApiError.badRequest("No category found");

        return candidate;

    }

    // MUTATIONS

    async add(name) {

        if(!name) throw ApiError.badRequest("Name for the category should be provided");

        const candidate = await Category.findOne({where: {name}});

        if(candidate) throw ApiError.badRequest("This category already exists");

        return await Category.create({name});

    }

    async update({id, name}) {

        if(!id) throw ApiError.badRequest("ID for the category should be provided");

        const candidate = await Category.findOne({where: {id}});

        if(!candidate) throw ApiError.badRequest("This category does not exist");

        await candidate.update({name: name});
        return true;

    }

    async delete(id) {

        if(!id) throw ApiError.badRequest("ID for the category should be provided");

        const candidate = await Category.findOne({where: {id}});

        if(!candidate) throw ApiError.badRequest("This category does not exist");

        await candidate.destroy({id});
        return true;

    }

}

export default new CategoryService();