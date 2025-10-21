import ApiError from "../error/ApiError.js";

// Middleware for checking user's role
const checkRole = (role) => (next) => async (parent, input, context, info) => {

    if (context.token === null) {
        throw ApiError.badRequest("Unauthorized");
    }

    if (context.token.role !== role) {
        throw ApiError.forbidden("You do not have access");
    }

    next(parent, input, context, info);
};

export default checkRole;
