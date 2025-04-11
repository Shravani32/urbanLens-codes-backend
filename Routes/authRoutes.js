import express from "express";
import upload from "../Middleware/multerCloudinary.js"; // Assuming you have a multer setup for file uploads
import { register, login } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);

export default router;
