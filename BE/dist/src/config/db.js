"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
// const port: any = process.env.PORT;
const port = 3306;
exports.DBconnection = promise_1.default.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "evolutiondb",
    port: port,
    waitForConnections: true,
});
