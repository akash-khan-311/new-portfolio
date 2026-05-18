import { TInfo } from "@/interface";
import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema<TInfo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Info || mongoose.model("Info", InfoSchema);
