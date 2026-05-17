import { TResume } from "@/interface";
import mongoose, { Schema } from "mongoose";

const ResumeSchema = new Schema<TResume>(
  {
    title: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export default Resume;
