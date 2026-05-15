/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IAdmin extends Document {
  email: string;
  password: string;
  name?: string;
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
}, { timestamps: true });

AdminSchema.pre<IAdmin>("save", async function (this: IAdmin, next: any) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);