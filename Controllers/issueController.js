import Post from "../models/Post.js";
import mongoose from "mongoose";

// Get all issues (posts)
export const getAllIssues = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserPosts = async (req, res) => {
  try {
    try {
      const userId = req.params.userId;
      console.log("UserId=",userId)
  
      const posts = await Post.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
      // res.send({userId:userId,posts:posts})
  
      const postsWithImages = posts.map((post) => ({
        description: post.description,
        department: post.department,
        status: post.status,
        issueAddress: post.issueAddress,
        image: post.image?.data?.toString('base64') || null,
        imageType: post.image?.contentType || null,
        createdAt: post.createdAt
      }));
  
      return res.status(200).json(postsWithImages);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


export const getIssuesByDepartment = async (req, res) => {
  try {
      const { role, departmentName } = req.user;
      console.log(departmentName);

      if (role !== "departmenthead") {
          return res.status(403).json({ message: "Access denied: Only department heads can view this data" });
      }

      const issues = await Post.find({ deparment: departmentName });
      res.json({ department: departmentName, total: issues.length, issues });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// Get issue by ID
export const getIssueById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Issue not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new issue
export const createIssue = async (req, res) => {
  console.log("request achieved")
  try {
    const { department, issueAddress, description } = req.body;
    console.log(req.user?._id);
    const userId=req.user?._id;
    console.log("UserId:",userId)

    const newPost = new Post({
      department,
      issueAddress,
      description,
      userId
    });

    if (req.file) {
      newPost.image.data = req.file.buffer;
      newPost.image.contentType = req.file.mimetype;
    }

    await newPost.save();

    console.log("Saved post:", newPost);
    res.status(200).json({ message: "Issue reported successfully!" });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ message: "Failed to report the issue." });
  } 

};

// Update an issue
export const updateIssue = async (req, res) => {
  try {
      const { id } = req.params;
      const { status, resolvedIssuePhoto } = req.body;

      // If status is being set to "completed", ensure resolvedIssuePhoto is also provided
      if (status === "completed" && (!resolvedIssuePhoto || resolvedIssuePhoto.trim() === "")) {
          return res.status(400).json({ message: "Resolved photo is required when marking issue as completed." });
      }

      const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedPost) return res.status(404).json({ message: "Issue not found" });

      res.json({ message: "Issue updated successfully", updatedPost });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


// Delete an issue
export const deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.json({ message: "Issue deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

