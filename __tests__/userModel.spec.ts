import Knex from "knex";
const knexConfig = require("../knexfile"); // Import knexConfig from "../knexfile";
const UserModel = require("../services/auth/dao/auth.dao");
import argon2 from "argon2";

const db = Knex(knexConfig.test); // Use a separate test database configuration
const userModel = new UserModel(db);

beforeAll(async () => {
    await db.migrate.latest(); // Run migrations before tests
});

afterAll(async () => {
    await db.destroy(); // Close the database connection after tests
});

describe("UserModel", () => {
    beforeEach(async () => {
        await db("users").truncate(); // Clean up users table before each test
    });

    test("should create a new user", async () => {
        const userData = {
            email: "test@example.com",
            password: "password123",
            name: "Test User",
        };
        await userModel.createUser(userData);
        const user = await userModel.getUserByEmail(userData.email);

        expect(user).toBeDefined();
        expect(user.email).toBe(userData.email);
        expect(user.name).toBe(userData.name);
        expect(await argon2.verify(user.password, userData.password)).toBe(
            true
        ); // Ensure the password is hashed correctly
    });

    test("should verify user credentials correctly", async () => {
        const userData = {
            email: "test@example.com",
            password: "password123",
            name: "Test User",
        };
        await userModel.createUser(userData);

        const isValid = await userModel.verifyUser(
            userData.email,
            userData.password
        );
        expect(isValid).toBe(true);
    });

    test("should throw an error if user not found", async () => {
        await expect(
            userModel.verifyUser("nonexistent@example.com", "password123")
        ).rejects.toThrow("User not found");
    });

    test("should not verify incorrect password", async () => {
        const userData = {
            email: "test@example.com",
            password: "password123",
            name: "Test User",
        };
        await userModel.createUser(userData);

        const isValid = await userModel.verifyUser(
            userData.email,
            "wrongpassword"
        );
        expect(isValid).toBe(false);
    });
});
