"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
require('dotenv').config(); // Load environment variables from .env file

// Log environment variables for debugging
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

var port = Number(process.env.DB_PORT) || 3306; // Default to 3306 if not set

exports.DBconnection = promise_1.default.createPool({
    host: process.env.DB_HOST, // Aiven hostname
    user: process.env.DB_USER, // Aiven username
    password: process.env.DB_PASSWORD, // Aiven password
    database: process.env.DB_NAME, // Aiven database name
    port: port,
    waitForConnections: true,
    connectionLimit: 10, // Optional: set a limit for connections
    queueLimit: 0 // Optional: no limit on queued connections
});