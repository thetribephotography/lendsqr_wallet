import { Request, Response, NextFunction } from "express";
import {
    user_login_factory,
    user_verify_otp_factory,
    create_user_factory,
    user_otp_factory,
    user_update_password_factory,
    verify_user_account,
} from "../factory/auth.factory";
import ERROR from "../../../constants/error.constant";
const STATUS = require("../../../constants/status.constants");

export const createUser = async (req: Request, res: Response) => {
    try {
        const { status, ...more } = await create_user_factory(req.body);
        res.status(status).json({ status, ...more });
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR_500).json(ERROR(error));
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { status, ...more } = await user_login_factory(
            req.body.email,
            req.body.password
        );
        res.status(status).json({ status, ...more });
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR_500).json(ERROR(error));
    }
};


export const verifyUserOtp = async (req: Request, res: Response) => {
    try {
        const { status, ...more } = await user_verify_otp_factory(
            req.body.email,
            req.body.otp
        );
        res.status(status).json({ status, ...more });
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR_500).json(ERROR(error));
    }
};

export const sendUserOtp = async (req: Request, res: Response) => {
    try {
        const { status, ...more } = await user_otp_factory(req.body.email);
        res.status(status).json({ status, ...more });
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR_500).json(ERROR(error));
    }
};


export const updateUserPassword = async (req: Request, res: Response) => {
    try {
        const { status, ...more } = await user_update_password_factory(
            req.body.email,
            req.body.password
        );
        res.status(status).json({ status, ...more });
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR_500).json(ERROR(error));
    }
};


export const verifyUserAccount = async (req: Request, res: Response) => {
    try {
        const { status, ...more } = await verify_user_account(
            req.user?.email,
            req.body.otp
        );
        res.status(status).json({ status, ...more });
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR_500).json(ERROR(error));
    }
};
