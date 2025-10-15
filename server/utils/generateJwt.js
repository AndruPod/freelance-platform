import jwt from "jsonwebtoken";

export const generateJwt = (payload) => {

    const {id, username, role} = payload;

    return jwt.sign(
        { id, username, role },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    );
    
}