import User from "../models/User.js";

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to get user", error: error.message });
    }
};

// Update user profile
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone, adharNo, departmentName, profilePicture, location } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, phone, adharNo, departmentName, profilePicture, location },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
};
