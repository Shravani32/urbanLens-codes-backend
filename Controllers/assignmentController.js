import supabase from "../supabaseClient.js";

// Get all assignments for logged-in staff
export const getAssignments = async (req, res) => {
    const { userId } = req.user;
    const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .eq("assigned_to", userId);
    
    if (error) return res.status(400).json(error);
    res.json(data);
};

// Mark an assignment as resolved
export const resolveAssignment = async (req, res) => {
    const { id } = req.params;
    const { photo_resolved } = req.body;

    const { error } = await supabase
        .from("assignments")
        .update({ status: "resolved", resolved_date: new Date(), photo_resolved })
        .eq("id", id);

    if (error) return res.status(400).json(error);
    res.json({ message: "Issue resolved successfully" });
};
