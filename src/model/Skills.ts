import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "tools"],
      required: true,
    },
    proficiency: { type: Number, min: 0, max: 100, required: true },
    icon: {
      type: String,
      required: false,
    },

    iconPublicId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
