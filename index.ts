// This is the entry point of the application.
// It calls the connectServer function from the index.loader file.
// The connectServer function is responsible for connecting the server to the database and starting the server.

const connectServer = require("./loaders/index.loader");
require("dotenv").config();

// export const app = connectServer();
connectServer();
