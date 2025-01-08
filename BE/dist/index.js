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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
const cors_1 = __importDefault(require("cors"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const competitionsRoutes_1 = __importDefault(require("./routes/competitionsRoutes"));
const administrativeRoutes_1 = __importDefault(require("./routes/administrativeRoutes"));
const finalisRoutes_1 = __importDefault(require("./routes/finalisRoutes"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const port = 3987;
const corsOptions = {
    origin: ["https://evolutiontelkomuniversity.com", "http://localhost:5173", "https://interiumevolution2024.vercel.app"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/register", registerRoutes_1.default);
app.use("/api/team", teamRoutes_1.default);
app.use("/api/competitions", competitionsRoutes_1.default);
app.use("/api/administrative", administrativeRoutes_1.default);
app.use("/api/finalis", finalisRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API evolution telkom university .......");
});
// Database connection check
let isDbConnected = false;
const checkDBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!isDbConnected) {
        try {
            const connection = yield db_1.DBconnection.getConnection();
            console.log("Database connected: " + connection.threadId);
            connection.release();
            isDbConnected = true; // Set the flag to true after successful connection
        }
        catch (error) {
            console.error("Database connection failed:", error);
            process.exit(1);
        }
    }
});
// Start the server for local development
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield checkDBConnection(); // Ensure DB connection is checked
    app.listen(port, () => {
        console.log(`Server running at ${port}`);
    });
});
startServer(); // Call the function to start the server
