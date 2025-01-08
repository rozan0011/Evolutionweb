import express from "express";
import dotenv from 'dotenv';
import { DBconnection } from "./config/db";
import registerRoutes from "./routes/registerRoutes";
import cors from "cors";
import teamRoutes from "./routes/teamRoutes";
import competitionsRoutes from "./routes/competitionsRoutes";
import administrativeRoutes from "./routes/administrativeRoutes";
import finalisRoutes from "./routes/finalisRoutes";

dotenv.config(); // Load environment variables

const app = express();
const port = 3987;

const corsOptions = {
    origin: ["https://evolutiontelkomuniversity.com", "http://localhost:5173", "https://interiumevolution2024.vercel.app"],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/register", registerRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/competitions", competitionsRoutes);
app.use("/api/administrative", administrativeRoutes);
app.use("/api/finalis", finalisRoutes);

app.get("/", (req, res) => {
    res.send("API evolution telkom university .......");
});


// Database connection check
let isDbConnected = false;

const checkDBConnection = async () => {
    if (!isDbConnected) {
        try {
            const connection = await DBconnection.getConnection();
            console.log("Database connected: " + connection.threadId);
            connection.release();
            isDbConnected = true; // Set the flag to true after successful connection
        } catch (error) {
            console.error("Database connection failed:", error);
            process.exit(1);
        }
    }
};

// Start the server for local development
const startServer = async () => {
    await checkDBConnection(); // Ensure DB connection is checked
    app.listen(port, () => {
        console.log(`Server running at ${port}`);
    });
};

startServer(); // Call the function to start the server