import connectApp from "./express.loader";
const settings = require("../config");
import {MysqlConnection} from "./mysql.loader";
import crypto  from "crypto";




/**
 * This function connects the server by calling the connectApp function which sets up the express app,
 * and then calls the MysqlConnection function to connect to the mysql database. If any error occurs during
 * these processes, it will be caught and logged to the console.
 */
const connectServer = async () => {
    try{
        await MysqlConnection();
        connectApp();

        // const secret = crypto.randomBytes(128).toString("base64");
        // console.log(secret);
    }catch(error){
        console.error(error);
    }
};

// module.exports = connectServer;

export default  connectServer;



