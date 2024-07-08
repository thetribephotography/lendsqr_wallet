import express, { Application } from "express";
import {
    createUser,
    loginUser,
    verifyUserOtp,
    sendUserOtp,
    updateUserPassword,
    verifyUserAccount,
} from "../controllers/auth.controller";
// import  requireSignIn from "../../../middleware/authenticate";
import { requireSignIn } from "../../../middleware/authenticate";
import {
    verify_user_email,
    verify_user_otp,
    verify_user_login,
    verify_user_reg,
    verify_user_password_update,
} from "../middlewares/auth.middleaware";


const authRoutes = (app: Application) => {
    app.post("/auth/signup", verify_user_reg, createUser);
    app.post("/auth/login", verify_user_login, loginUser);
    app.post("/auth/otp/verify", verify_user_otp, verifyUserOtp);
    app.get("/auth/otp/send", verify_user_email, sendUserOtp);
    app.put(
        "/auth/password/update",
        verify_user_password_update,
        updateUserPassword
    );
    app.post("/auth/verify", requireSignIn, verifyUserAccount);
};

// module.exports = authRoutes;
export default authRoutes;
