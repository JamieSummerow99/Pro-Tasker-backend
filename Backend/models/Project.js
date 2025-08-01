
import mongoose, { Schema} from "mongoose";
import bcrypt from "bcrypt";



const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema)
export default Project;