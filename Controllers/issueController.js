import supabase from "../supabaseClient.js";

// Get all issues
export const getAllIssues = async (req, res) => {
    const { data, error } = await supabase.from("issues").select("*");
    if (error) return res.status(400).json(error);
    res.json(data);
};

// Get issue by ID
export const getIssueById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("issues").select("*").eq("issue_id", id).single();
    if (!data) return res.status(404).json({ message: "Issue not found" });
    res.json(data);
};

// Create a new issue
export const createIssue = async (req, res) => {
    const { title, description, photo_complaint, location } = req.body;
    const { data, error } = await supabase
        .from("issues")
        .insert([{ title, description, photo_complaint, location }]);
    if (error) return res.status(400).json(error);
    res.status(201).json(data);
};

// Update an issue
export const updateIssue = async (req, res) => {
    const { id } = req.params;
    const { status, assigned_to_staffHead, photo_resolved } = req.body;

    const { data, error } = await supabase
        .from("issues")
        .update({ status, assigned_to_staffHead, photo_resolved })
        .eq("issue_id", id);

    if (error) return res.status(400).json(error);
    res.json({ message: "Issue updated successfully", data });
};

// Delete an issue
export const deleteIssue = async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from("issues").delete().eq("issue_id", id);
    if (error) return res.status(400).json(error);
    res.json({ message: "Issue deleted successfully" });
};
