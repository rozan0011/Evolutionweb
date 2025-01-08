import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { DBconnection } from "./config/db";
import registerRoutes from "./routes/registerRoutes";
import cors from "cors";
import teamRoutes from "./routes/teamRoutes";
import competitionsRoutes from "./routes/competitionsRoutes";
import administrativeRoutes from "./routes/administrativeRoutes";
import finalisRoutes from "./routes/finalisRoutes";
import userRoutes from './routes/userRoutes';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3987; // Use environment variable for port

const corsOptions = {
    origin: ["https://interiumevolution2024.vercel.app"],
    optionsSuccessStatus: 200,
};

console.log("CORS options set for frontend connection");

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Received request for ${req.url}`);
    next();
});

// CORS and JSON middleware
app.use(cors(corsOptions));
app.use(express.json());

// Define your routes
app.use("/api/register", registerRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/competitions", competitionsRoutes);
app.use("/api/administrative", administrativeRoutes);
app.use("/api/finalis", finalisRoutes);
app.use('/api', userRoutes);

app.get("/", (req: Request, res: Response) => {
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

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

startServer(); // Call the function to start the server