import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema(
  {
    socials: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Social ||
  mongoose.model("Social", SocialSchema);