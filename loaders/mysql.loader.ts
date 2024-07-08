require("ts-node/register");
import Knex, { Knex as KnexType } from "knex";
const settings = require("../config");
let connect: KnexType | null = null;

export const MysqlConnection = async (): Promise<void> => {
    if (connect) {
         return; // Return if already connected
    }

    try {
        connect = Knex({
            client: "mysql2",
            connection: {
                host: settings.host,
                port: settings.db_port,
                user: settings.user,
                password: settings.password,
                database: settings.database,
            },
            pool: { min: 2, max: 10 }, // Optional: Configure the connection pool
        });

        if (connect) {
        console.log("Database Connected Successfully");
        } else{
            console.log("Database Connection Failed");
        }

    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

export const getConnection = (): KnexType => {
    if (!connect) {
        throw new Error("Database connection is not initialized");
    }
    return connect;
};
export default { MysqlConnection, getConnection };








// export const getConnection = (): KnexType => {
//     if (connect) {
//         return connect;
//     } else{
//         // throw new Error("Database connection is not initialized");
//         console.log("Hello");
//     }
// };
