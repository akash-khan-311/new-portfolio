import mongoose from "mongoose";
import { TAbout } from "@/interface";
const AboutSchema = new mongoose.Schema<TAbout>(
  {
    heading: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);
