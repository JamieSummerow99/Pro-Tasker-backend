import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true }); 

const Post = mongoose.model("Post", postSchema);

export default Post;