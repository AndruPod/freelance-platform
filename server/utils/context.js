import jwt from "jsonwebtoken";

const createContext = ({req}) => {
    try {

        const authToken = req.headers.authorization;

        if(!authToken) {
            return {token: null}
        }

        const token = authToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return {token: decoded};

    } catch(e) {
        return {token: null};
    }
}

export default createContext;