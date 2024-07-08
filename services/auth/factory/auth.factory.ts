import userDAO from "../dao/auth.dao";
const generateToken = require("../../../utils/tokenizer");
// const ERROR = require("../../../constants/error.constant");
import ERROR from "../../../constants/error.constant";
const STATUS = require("../../../constants/status.constants");
import { Request, Response, NextFunction } from "express";
import { env } from "process";
const sendMail = require("../../../utils/sendMail");
import generateOtp from "../../../utils/otpGenerator";

interface User {
    // other properties...
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    otp?: string;
    user_status?: number;
}

export const create_user_factory = async (data: any) => {
    try {
        const userData = {
            password: data.password,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            user_status: data.user_status,
            otp: await generateOtp(),
        };

        const user: User = await userDAO.createUser(
            userData
        ) as unknown as User;

        if (!user)
            throw {
                status: STATUS.INTERNAL_SERVER_ERROR_500,
                message: "Unable to create user",
                error: null,
                result: null,
            };

        console.log(user);
        // user.otp = await generateToken(user);
        const notifictionToken = env.NOTIFICATION_TOKEN;

        const mailData = {
            title: user.first_name,
            body:
                user.first_name +
                " " +
                user.last_name +
                " " +
                "has been created successfully. Kindly Input the OTP sent to you",
            email_body:
                user.first_name +
                " " +
                user.last_name +
                " " +
                "has been created successfully. Kindly Input the OTP sent to you",
            extraData: {
                otp: user.otp,
            },
            user_details: {
                notifictionToken: user.email,
            },
        };
        const sender = await sendMail(mailData);

        return {
            status: STATUS.CREATED_201,
            message: "User created successfully",
            error: null as any,
            result: {
                user: user,
            },
        };
    } catch (err) {
        return ERROR(err);
    }
};

export const user_login_factory = async (email: string, password: string) => {
    try {
        const user = await userDAO.findUser(email, password);

        if (!user)
            throw {
                status: STATUS.UNAUTHORIZED_401,
                message: "Invalid credentials",
                error: null,
                result: null,
            };

        user.token = await generateToken(user);
        if (user.user_status === 2) {
            const notifictionToken = env.NOTIFICATION_TOKEN;

            const mailData = {
                title: user.first_name,
                body:
                    user.first_name +
                    " " +
                    user.last_name +
                    " " +
                    "has been created successfully. Kindly Input the OTP sent to you",
                email_body:
                    user.first_name +
                    " " +
                    user.last_name +
                    " " +
                    "has been created successfully. Kindly Input the OTP sent to you",
                extraData: {
                    otp: user.otp,
                },
                user_details: {
                    notifictionToken: user.email,
                },
            };
            const sender = await sendMail(mailData);
        }

        return {
            status: STATUS.OK_200,
            message: "User logged in successfully",
            error: null as any,
            result: {
                user: user,
            },
        };
    } catch (err) {
        return ERROR(err);
    }
};

export const user_verify_otp_factory = async (email: string, otp: string) => {
    try {
        const user = await userDAO.findUserByOtp(email, otp);

        if (!user || user === null)
            throw {
                status: STATUS.UNAUTHORIZED_401,
                message: "Invalid credentials",
                error: null,
                result: null,
            };

        return {
            status: STATUS.OK_200,
            message: "User Verified Successfully",
            error: null as any,
            result: null as any,
        };
    } catch (err) {
        return ERROR(err);
    }
};

export const user_otp_factory = async (email: string) => {
    try {
        const user = await userDAO.getUserByEmail(email);

        if (!user || user === null)
            throw {
                status: STATUS.UNAUTHORIZED_401,
                message: "Invalid credentials",
                error: null,
                result: null,
            };

        const otp = await generateOtp();
        const updatedUser: User = await userDAO.saveUserOtp(user.email, otp) as unknown as User;

        if (!updatedUser || updatedUser === null)
            throw {
                status: STATUS.INTERNAL_SERVER_ERROR_500,
                message: "Unable to send otp",
                error: null,
                result: null,
            };

        const notifictionToken = env.NOTIFICATION_TOKEN;

        const mailData = {
            title: user.first_name,
            body:
                "Hi There " +
                updatedUser.first_name +
                "An OTP was generated for your account. Kindly Input the OTP sent to you",
            email_body:
                " Hi There " +
                updatedUser.first_name +
                "An OTP was generated for your account. Kindly Input the OTP sent to you",
            extraData: {
                otp: updatedUser.otp,
            },
            user_details: {
                notifictionToken: updatedUser.email,
            },
        };
        const sender = await sendMail(mailData);

        return {
            status: STATUS.OK_200,
            message: "OTP sent successfully",
            error: null as any,
            result: null as any,
        };
    } catch (err) {
        return ERROR(err);
    }
};

export const user_update_password_factory = async (
    email: string,
    password: string
) => {
    try {
        const user = await userDAO.getUserByEmail(email);

        if (!user || user === null)
            throw {
                status: STATUS.INTERNAL_SERVER_ERROR_500,
                message: "Invalid credentials",
                error: null,
                result: null,
            };

            const userData = {
                password: password
            }

        const updatedUser = await userDAO.updateUser(user.id, userData);

        if (!updatedUser || updatedUser === null)
            throw {
                status: STATUS.INTERNAL_SERVER_ERROR_500,
                message: "Unable to update password",
                error: null,
                result: {
                    user: updatedUser,
                },
            };

        return {
            status: STATUS.OK_200,
            message: "Password updated successfully",
            error: null as any,
            result: {
                user: updatedUser,
            },
        };
    } catch (err) {
        return ERROR(err);
    }
};

export const verify_user_account = async (email: string, otp: string) => {
    try {
        const user = await userDAO.findUserByOtp(email, otp);

        if (!user || user === null)
            throw {
                status: STATUS.INTERNAL_SERVER_ERROR_500,
                message: "Invalid credentials",
                error: null,
                result: null,
            };

        const data = {
            user_status: 3,
        };

        const verify_user = await userDAO.updateUser(user.id, data);

        if (!verify_user || verify_user === null)
            throw {
                status: STATUS.INTERNAL_SERVER_ERROR_500,
                message: "Unable to verify user",
                error: null,
                result: null,
            };

        return {
            status: STATUS.OK_200,
            message: "User verified successfully",
            error: null as any,
            result: {
                user: verify_user,
            },
        };
    } catch (err) {
        return ERROR(err);
    }
};
