"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
// Log environment variables for debugging
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD); // For debugging only, remove in production
const port = Number(process.env.DB_PORT) || 3306; // Default to 3306 if not set
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
// Test the connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield exports.DBconnection.getConnection();
        console.log("Database connected: " + connection.threadId);
        connection.release(); // Release the connection back to the pool
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
});
// Call the test connection function
testConnection();
