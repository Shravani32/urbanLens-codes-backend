import express from "express";
import { getAllIssues, getIssueById, createIssue, updateIssue, deleteIssue } from "../Controllers/issueController.js";
import { verifyToken } from "../Middleware/authMiddleWare.js";

const router = express.Router();

router.get("/", verifyToken, getAllIssues);
router.get("/:id", verifyToken, getIssueById);
router.post("/", verifyToken, createIssue);
router.put("/:id", verifyToken, updateIssue);
router.delete("/:id", verifyToken, deleteIssue);

export default router;
