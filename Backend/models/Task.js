import mongoose,{ Schema} from "mongoose";
import express from "express"


const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
//gives context to the task
  description: {
    type: String,
    required: false
  },
//project to which the task belongs
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
//WHO
 

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do"
  },

  tags: {
    type: [String],
    enum: ["work", "personal", "urgent", "important"],
    default: ["personal"]
  },

  dueDate: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("Task", taskSchema);


export default Task;


