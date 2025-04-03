import express from "express";
import cors from "cors"; 
import dotenv from "dotenv"; 
import issueRoutes from "./Routes/issueRoutes.js";
import assignmentRoutes from "./Routes/assignmentRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

// Load environment variables
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "*",  // Allow all origins (change for production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); // Parse JSON request body

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

