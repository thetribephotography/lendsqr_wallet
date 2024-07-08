const jwt = require("jsonwebtoken");
import settings from "../config";

const createToken = (email: string, UserId: string, time: string) => {
    return jwt.sign({ email, UserId, time }, settings.token_secret, {
        algorithm: "HS256",
        expiresIn: "2hr",
    });
};

export default createToken;
