"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));

// Use environment variables for sensitive information
exports.DBconnection = promise_1.default.createPool({
    host: process.env.DATABASE_HOST || 'your_aiven_host', // Replace with your Aiven host
    user: process.env.DATABASE_USERNAME || 'your_username', // Replace with your Aiven username
    password: process.env.DATABASE_PASSWORD || 'your_password', // Replace with your Aiven password
    database: process.env.DATABASE_NAME || 'your_database_name', // Replace with your Aiven database name
    ssl: {
        rejectUnauthorized: true // Required for Aiven
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});