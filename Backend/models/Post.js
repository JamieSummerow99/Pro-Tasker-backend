import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
   author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true},



    title: {
    type: String,
    required: true,
  },


  decription: {
    type: String,
    required: true,
  },
 
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
    importance: {
    type: String,
    enum: ["To Do", "in progress", "Done"],
    default: "in progess",
  },
    tags: {
        type: [String],
        enum: ["work", "personal", "urgent", "important"],
        default: ["personal"]}


});



const Post = mongoose.model("Post", postSchema);
export default Post;