import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({   
    description: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required: true,
    },
    deparment:{
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    resolvedIssuePhoto:{
        type:String
    },
    likeCount:{
        type:Number,
    },
    dislikeCount:{
        type:Number
    },
    comments:{
        type:String,
    }

}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
export default Post;