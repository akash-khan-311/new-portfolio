import { THero } from "@/interface";
import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema<THero>(
  {
    heading: { type: String, required: true },
    gradientTitle: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
