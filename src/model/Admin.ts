import { TAdmin } from "@/interface";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema<TAdmin>(
  {
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "admin" },
  },
  { timestamps: true },
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
