// This script contains all env keys and values
require("dotenv").config();

/**
 * A const variable containing all env values
 */
const settings = {
    port: process.env.PORT,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
    token_secret: process.env.JWT_SECRET_KEY,
    // db_url: process.env.DB_URL,
};

// module.exports = settings;

export default settings;
