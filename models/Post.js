import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({   
  description: { type: String, required: true },
  image: { data: Buffer, contentType: String },  // Store as Buffer
  department: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  resolvedIssuePhoto: { type: String },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  comments: { type: String },
  issueAddress: { type: String }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);
export default Post;
