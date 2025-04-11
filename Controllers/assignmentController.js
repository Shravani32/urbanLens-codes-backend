import Assignment from "../models/Assignment.js"; 

export const getAssignments = async (req, res) => {
    try {
        const { userId } = req.user;
        const assignments = await Assignment.find({ assignedTo: userId });
        res.json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const resolveAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const { photo_resolved } = req.body;

        const updatedAssignment = await Assignment.findByIdAndUpdate(
            id,
            {
                status: "completed", // ✅ Must match enum
                resolved_date: new Date(),
                photo_resolved
            },
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        res.json({ message: "Issue resolved successfully", updatedAssignment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
