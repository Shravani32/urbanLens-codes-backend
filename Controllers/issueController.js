import Post from "../models/Post.js";

// Get all issues (posts)
export const getAllIssues = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
  try {
    const {
      description,
      image, // URL from frontend
      deparment,
      userId,
      location,
      resolvedIssuePhoto, // can be optional at creation
      likeCount,
      dislikeCount,
      comments,
    } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const newPost = new Post({
      description,
      image,
      deparment,
      userId,
      location,
      resolvedIssuePhoto: resolvedIssuePhoto || "", // allow empty at first
      likeCount: likeCount || 0,
      dislikeCount: dislikeCount || 0,
      comments,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create Issue Error:", error);
    res.status(500).json({ error: error.message });
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

