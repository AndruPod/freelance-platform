import jwt from "jsonwebtoken";

// Generating a JWT
export const generateJwt = (payload) => {

    const {id, username, role} = payload;

    return jwt.sign(
        { id, username, role },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '2h'}
    );
    
}