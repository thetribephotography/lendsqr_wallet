import Joi from "joi";
// const ERROR = require("../../../constants/error.constant");
import ERROR from "../../../constants/error.constant";
const STATUS = require("../../../constants/status.constants");
import { Request, Response, NextFunction } from "express";
// import { verify } from "crypto";



export const verify_user_reg = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const schema = Joi.object({
            first_name: Joi.string()
                .required()
                .error(new Error("First name is required")),
            last_name: Joi.string()
                .required()
                .error(new Error("Last name is required")),
            email: Joi.string().email().required(),
            phoneNumber: Joi.number().required(),
            password: Joi.string()
                .required()
                .pattern(new RegExp("^[A-Za-z@0-9]{6,30}$")),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw {
                status: STATUS.BAD_REQUEST_400,
                message: error.details[0].message, // Set the message property to the actual error message
                error: error.details,
                result: null,
            };
        }

        req.body = value;
        return next();
    } catch (err) {
        return res.status(err.status).json(ERROR(err));
    }
};



export const verify_user_login = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .error(new Error("Email is required")),
            password: Joi.string()
                .required()
                .error(new Error("Password is required")),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw {
                status: STATUS.BAD_REQUEST_400,
                message: error.details[0].message,
                error: error.details,
                result: null,
            };
        }

        req.body = value;
        return next();
    } catch (err) {
        return res.status(err.status).json(ERROR(err));
    }
};


export const verify_user_email = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .error(new Error("Email is required")),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw {
                status: STATUS.BAD_REQUEST_400,
                message: error.details[0].message,
                error: error.details,
                result: null,
            };
        }

        req.body = value;
        return next();
    } catch (err) {
        return res.status(err.status).json(ERROR(err));
    }
};


export const verify_user_otp = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .error(new Error("Email is required")),
            otp: Joi.string().required().error(new Error("OTP is required")),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw {
                status: STATUS.BAD_REQUEST_400,
                message: error.details[0].message,
                error: error.details,
                result: null,
            };
        }

        req.body = value;
        return next();
    } catch (err) {
        return res.status(err.status).json(ERROR(err));
    }
};


export const verify_user_password_update = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .error(new Error("Email is required")),
            password: Joi.string()
                .required()
                .error(new Error("Password is required")),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw {
                status: STATUS.BAD_REQUEST_400,
                message: error.details[0].message,
                error: error.details,
                result: null,
            };
        }

        req.body = value;
        return next();
    } catch (err) {
        return res.status(err.status).json(ERROR(err));
    }
};
