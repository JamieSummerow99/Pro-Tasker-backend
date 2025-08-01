import mongoose from 'mongoose'
//this is the structure in which the project page will show
const projectSchema = new mongoose.Schema(
  {//to test {"title":"","description":""}
    title: {
      type: String,
      required: true,
    },
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }//timestam
);

;

const Project = mongoose.model("Project", projectSchema)
export default Project;