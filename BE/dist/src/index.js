"use strict";
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
const port = 3987; // Define the port
// CORS options
const corsOptions = {
    origin: ["https://evolutiontelkomuniversity.com", "http://localhost:5173"],
    optionsSuccessStatus: 200,
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Routes
app.use("/api/register", registerRoutes_1.default);
app.use("/api/team", teamRoutes_1.default);
app.use("/api/competitions", competitionsRoutes_1.default);
app.use("/api/administrative", administrativeRoutes_1.default);
app.use("/api/finalis", finalisRoutes_1.default);
// Root endpoint
app.get("/", (req, res) => {
    res.send("API evolution telkom university .......");
});
// Database connection check
let isDbConnected = false;
const checkDBConnection = async () => {
    if (!isDbConnected) {
        try {
            const connection = await db_1.DBconnection.getConnection();
            console.log("Database connected: " + connection.threadId);
            connection.release();
            isDbConnected = true; // Set the flag to true after successful connection
        }
        catch (error) {
            console.error("Database connection failed:", error);
            process.exit(1);
        }
    }
};
// Start the server for local development
const startServer = async () => {
    await checkDBConnection(); // Ensure DB connection is checked
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};
startServer(); // Call the function to start the server
