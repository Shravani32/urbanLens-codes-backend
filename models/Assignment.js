import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    photo_resolved: {
        type: String, // Assuming a URL or base64 string
    },
    resolved_date: {
        type: Date,
    }
}, {
    timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;