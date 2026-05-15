import { TProject } from "@/interface";
import mongoose, { Model, Schema } from "mongoose";

export const ProjectSchema = new Schema<TProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: false,
  },

  imagePublicId: {
    type: String,
    required: false,
  },
  codeLink: { type: String, required: true },
  liveLink: { type: String, required: true },
  technologies: { type: [String], required: true },
});
const Project = (mongoose.models?.Project ||
  mongoose.model<TProject>("Project", ProjectSchema)) as Model<TProject>;

export default Project;
