import express from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../Controllers/userController.js";
import { verifyToken } from "../Middleware/authMiddleWare.js";

const router = express.Router();

// ✅ Get all users (Admin or Commissioner can fetch)
router.get("/", verifyToken, getUsers);

// ✅ Get a specific user by ID
router.get("/:id", verifyToken, getUserById);

// ✅ Update user details (Profile Update)
router.put("/:id", verifyToken, updateUser);

// ✅ Delete user (Admin only)
router.delete("/:id", verifyToken, deleteUser);

export default router;
