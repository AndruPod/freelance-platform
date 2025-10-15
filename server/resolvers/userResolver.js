import ApiError from "../error/ApiError.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";
import UserService from "../services/userService.js";

export const userResolver = {
    Query: {

        getAllUsers: async() => {
            try {
                return await UserService.getAll();
            } catch (e) {
                return ApiError.internal(e.message);
            }
        },

        getUserById: async(_, {id}) => {
            try {
                return await UserService.getOneById(id);
            } catch(e) {
                return e;
            }
        },

        getUsersByRole: async(_, {role}) => {
            try {
                return await UserService.getAllByRole(role);
            } catch(e) {
                return e;
            }
        },

        checkAuth: async(_, __, context) => {
            try {
                return await UserService.checkAuth(context);
            } catch(e) {
                return e;
            }
        }
    },

    Mutation: {

        login: async(_, {input}) => {
            try {
                return await UserService.login(input);
            } catch(e) {
                return e;
            }
        },

        register: async(_, {input}) => {
            try {
                return await UserService.register(input);
            } catch(e) {
                return e;
            }
        },

        updateRole: checkRole("ADMIN")(async(_, {input}) => {
            try {
                return await UserService.updateRole(input);
            } catch(e) {
                return e;
            }
        }),

        deleteUser: checkRole("ADMIN")(async(_, {id}) => {
            try {
                return await UserService.delete(id);
            } catch(e) {
                return e;
            }
        })

    }
};