import supabase from "../supabaseClient.js";

// ✅ Get all users
export const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};

// ✅ Get a single user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase.from("users").select("*").eq("user_id", id).single();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: "User not found", error: error.message });
    }
};

// ✅ Update user profile
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, profile_picture } = req.body;
    try {
        const { data, error } = await supabase
            .from("users")
            .update({ name, email, phone_number, profile_picture })
            .eq("user_id", id)
            .select();
        if (error) throw error;
        res.status(200).json({ message: "User updated successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

// ✅ Delete user (Admin only)
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from("users").delete().eq("user_id", id);
        if (error) throw error;
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
};
