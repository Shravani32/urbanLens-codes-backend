import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js"; // Make sure this path is correct

dotenv.config();

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decode:",decoded)
        req.user = await User.findById(decoded._id).select("-password");
        console.log("Token verified, user:", decoded._id);
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
