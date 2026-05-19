import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    userId: String,
    role: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Memory ||
  mongoose.model("Memory", memorySchema);