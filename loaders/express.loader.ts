import express from "express";
import cors from "cors";
import session from "express-session";
import settings from "../config";
import authRoutes from "../services/auth/routes/auth.route";

export const ExpressLoader = async () => {
    try {
        const app = express();

        app.use(express.urlencoded({ extended: true }));

        app.use(express.json());

        app.use(
            cors({
                credentials: true,
            })
        );

        //Initialize Routes
        authRoutes(app);


        app.listen(settings.port, () => {
            console.log(`Server running on port ${settings.port}....`);
        })
    } catch (error) {
        console.error(error);
    }
};

export default ExpressLoader;
