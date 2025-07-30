import mongoose from "mongoose";

const { Schema, model } = mongoose;

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

export default model("Project", projectSchema);
