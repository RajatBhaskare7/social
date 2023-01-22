import mongoose from "mongoose";

const postSchema =mongoose.Schema(
    {
        userId: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        location: String,
        description: String,
        picturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        userPicturePath: String,
        comments: {
            type: Array,
            default: [],
        }
        
    },
    {timestamps: Boolean},
    
);
const Post = mongoose.model("Post",postSchema);

export default Post;
