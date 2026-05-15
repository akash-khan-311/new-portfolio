import { TExperience } from "@/interface";
import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema<TExperience>(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "Present" },
    description: { type: String, required: true },
    type: { type: String, enum: ["Remote", "On-site", "Hybrid"], required: true },
    image: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);
