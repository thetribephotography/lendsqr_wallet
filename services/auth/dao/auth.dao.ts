// import Knex from "knex";
import { Knex } from "knex";
// import  MysqlConnection from "../../../loaders/mysql.loader";
import Joi from "joi";
// const UserModel = require("../../../database/migrations/20240701170526_users");
import argon2 from 'argon2';
// import knex from "knex";
import { getConnection } from "../../../loaders/mysql.loader";
import { Knex as KnexType } from "knex";

interface User {
    // other properties...
    password?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    otp?: string;
    user_status?: number;
}

class userDAO {
    // private db: Knex;

    constructor(private db: any) {
        this.db = getConnection;
    }

    async createUser(data: User) {
        data.password = await argon2.hash(data.password);

        return await this.db("users").insert(data);
    }

    async getUserByEmail(email: string) {
        return await this.db("users").where({ email: email }).first();
    }

    async getUserById(id: number | string) {
        return await this.db("users").where({ id: id }).first();
    }

    async updateUser(id: number, data: User) {
        if (data.password) {
            data.password = await argon2.hash(data.password);
        }

        return await this.db("users").where({ id: id }).update(data);
    }

    async findUser(email: string, password: string) {
        let user = await this.getUserByEmail(email);
        if (user) {
            if (await argon2.verify(user.password, password)) {
                return user;
            }
        }
        return null;
    }

    async findUserByOtp(email: string, otp: string) {
        let user = await this.getUserByEmail(email);
        if (user) {
            if (user.otp === otp) {
                return user;
            }
        }
        return null;
    }

    async saveUserOtp(email: string, otp: string) {
        return await this.db("users")
            .where({ email: email })
            .update({ otp: otp });
    }
}

// const instanceUserDAO = new userDAO();
export default new userDAO(getConnection);

// module.exports = userDAO;


