import type { Knex } from "knex";
import settings from "./config";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql2",
        connection: {
            host: settings.host,
            port: parseInt(settings.db_port),
            user: settings.user,
            password: settings.password,
            database: settings.database,
        },
        migrations: {
            directory: "./database/migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./database/seeds",
            extension: "ts",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            host: settings.host,
            port: parseInt(settings.db_port),
            user: settings.user,
            password: settings.password,
            database: settings.database,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./database/migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./database/seeds",
            extension: "ts",
        },
    },

    production: {
        client: "mysql2",
        connection: {
            host: settings.host,
            port: parseInt(settings.db_port),
            user: settings.user,
            password: settings.password,
            database: settings.database,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./database/migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./database/seeds",
            extension: "ts",
        },
    },
};

module.exports = config;
