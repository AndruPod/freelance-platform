import {Category} from "../models/models.js";
import ApiError from "../error/ApiError.js";
import {Op} from "sequelize";
import checkRole from "../middlewares/checkRoleMiddleware.js";
import CategoryService from "../services/categoryService.js";

export const categoryResolver = {

    Query: {

        getAllCategories: async() => {
            try {
                return await CategoryService.getAll();
            } catch(e) {
                return ApiError.internal(e.message);
            }
        },

        getCategoryById: async(_, {id}) => {
            try {
                return await CategoryService.getOneById(id);
            } catch(e) {
                return e;
            }
        }

        // getSomeCategories: async (_, {input}) => {
        //     try {
        //
        //         if (!Array.isArray(input) || !input.some(id => typeof id !== 'number')) {
        //             return ApiError.badRequest('idList should be an array of numbers');
        //         }
        //
        //         return await Category.findAll({ raw: true,
        //             where: {
        //                 id: {
        //                     [Op.in]: input
        //                 }
        //             }});
        //
        //     } catch(e) {
        //         return ApiError.internal("Something went wrong");
        //     }
        // }
    },

    Mutation: {

        addCategory: checkRole("ADMIN")(async(_, {name}) => {
            try {
                return await CategoryService.add(name);
            } catch(e) {
                return e;
            }
        }),

        updateCategory: checkRole("ADMIN")(async(_, {input}) => {
            try {
                return await CategoryService.update(input);
            } catch(e) {
                return e;
            }
        }),

        deleteCategory: checkRole("ADMIN")(async(_, {id}) => {
            try {
                return await CategoryService.delete(id);
            } catch(e) {
                return e;
            }
        })

    }

};