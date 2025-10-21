import {User} from "../models/models.js";
import ApiError from "../error/ApiError.js";
import {generateJwt} from "../utils/generateJwt.js";
import bcrypt from "bcrypt";
import {jwtDecode} from "jwt-decode";

class UserService {

    // QUERIES

    // Get all users
    async getAll() {
        return await User.findAll();
    }

    // Get one user by ID
    async getOneById(id) {

        if(!id)
            throw ApiError.badRequest("User ID should be provided");

        const user = await User.findOne({where: {id}});

        if(!user)
            throw ApiError.badRequest("User does not exist");

        return user;

    }

    // Get users by role
    async getAllByRole(role) {

        if(!role)
            throw ApiError.badRequest("User role should be provided");

        return await User.findAll({where: {role}});

    }

    // Check for authentication
    async checkAuth(context) {

        const {token} = context;

        if(!token)
            throw ApiError.badRequest("Unauthorized");

        const {id, username, role} = token;
        const newToken = generateJwt({id, username, role});
        return {token: newToken, id: id, username: username};

    }

    // MUTATIONS

    // Login
    async login({username, password}) {

        if(!username || !password)
            throw ApiError.badRequest("Username or password is required");

        const user = await User.findOne({where: {username}});

        if(!user)
            throw ApiError.badRequest("User does not exist");

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword)
            throw ApiError.badRequest("Password is incorrect");

        const token = generateJwt(user);
        return {token};

    }

    // Sign up
    async register({username, password, role}) {

        if(!username || !password)
            throw ApiError.badRequest("Username or password is required");

        const candidate = await User.findOne({where: {username}});

        if(candidate)
            throw ApiError.badRequest("User already exists");

        if(password.length < 8)
            throw ApiError.badRequest("Password must be at least 8 characters long");

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username: username,
            password: hashedPassword,
            role: role
        });

        const token = generateJwt(user);
        return {token};

    }

    // Update user's role
    async updateRole({id, role}) {

        if(!id)
            throw ApiError.badRequest("ID should be provided");

        const candidate = await User.findOne({where: {id}});

        if(!candidate)
            throw ApiError.badRequest("User does not exist");

        await candidate.update({role: role});
        return true;

    }

    // Delete user
    async delete(id) {

        if(!id)
            throw ApiError.badRequest("ID is not provided!");

        const candidate = await User.findOne({where: {id}});

        if(!candidate)
            throw ApiError.badRequest("User does not exist");

        await candidate.destroy();
        return true;

    }

}

export default new UserService();