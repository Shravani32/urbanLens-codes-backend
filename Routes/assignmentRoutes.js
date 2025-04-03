import express from "express";
import { getAssignments, resolveAssignment } from "../Controllers/assignmentController.js";
import { verifyToken } from "../Middleware/authMiddleWare.js";

const router = express.Router();

router.get("/", verifyToken, getAssignments);
router.put("/:id", verifyToken, resolveAssignment);

export default router;
