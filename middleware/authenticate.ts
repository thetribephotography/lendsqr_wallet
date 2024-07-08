const token_generator = require("../utils/tokenizer");
import jwt, { JwtPayload } from "jsonwebtoken";
const settings = require("../config");
const STATUS = require("../constants/status.constants");
// const ERROR = require("../constants/error.constant");
import ERROR from "../constants/error.constant";
const UserDAO = require("../services/auth/dao/auth.dao");
import { Request, Response, NextFunction } from "express";

//EXTRACT TOKEN

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}

function extractToken(req: Request) {
    const header = req.headers.authorization;
    return (
        (header && header.split(" ")[1]) ||
        (req.cookies && req.cookies.authToken)
    );
}

async function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, settings.token_secret) as JwtPayload;
        const user = await UserDAO.getUserById(decoded.UserId);

        if (!user)
            throw {
                status: STATUS.NOT_FOUND_404,
                message: "No User Found",
                error: user.err.details,
                result: null,
            };

        return user;
    } catch (err) {
        if (err.name === "TokenExpiredError")
            throw {
                status: STATUS.INVALID_TOKEN_498,
                message: "Token expired, Kindly Login Again",
                error: err.details,
                result: null,
            };
        else
            throw {
                status: STATUS.FORBIDDEN_403,
                message: "Invalid token",
                error: err.details,
                result: null,
            };
    }
}

export const requireSignIn = async (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(STATUS.MISSING_TOKEN_499).json({
            message: "User Not Authenticated...Kindly Provide a Token",
            result: null,
        });
    }

    try {
        const { user, email } = await verifyToken(token);
        req.user = user;
        req.body.email = email;

        next();
    } catch (err) {
        return res.status(err.status).json(ERROR(err));
    }
}

export default { requireSignIn };


// module.exports = { requieSignIn };
