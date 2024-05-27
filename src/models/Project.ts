import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export type ProyectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
};

const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Project = mongoose.model<ProyectType>("Project", ProjectSchema);
export default Project;
