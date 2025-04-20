import express from "express";
import { getAllIssues, getIssueById, createIssue, updateIssue, deleteIssue, getIssuesByDepartment,getUserPosts } from "../Controllers/issueController.js";
import {verifyToken}  from "../Middleware/authMiddleWare.js";
import upload from '../Middleware/upload.js';


const router = express.Router();

router.get("/getallissues", verifyToken, getAllIssues);
router.get("/department", verifyToken, getIssuesByDepartment);
router.get("/getbyId:id", verifyToken, getIssueById);
router.post("/createissue",verifyToken,upload.single('image'), createIssue);
router.get('/userposts/:userId', getUserPosts);
router.put("/updateissue:id", verifyToken, updateIssue);
router.delete("/deleteissue:id", verifyToken, deleteIssue);

export default router;
