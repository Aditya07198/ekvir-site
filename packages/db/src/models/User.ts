import { Schema, model, models, Document } from "mongoose";

export type UserRole = "superadmin" | "admin" | "user";
export type AuthProvider = "email" | "google";

export interface IUser extends Document {
  name?: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  role: UserRole;
  provider: AuthProvider;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: { type: String, trim: true, maxlength: 20 },
    passwordHash: { type: String },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
    provider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    googleId: { type: String, trim: true },
  },
  { timestamps: true }
);

export const User = models["User"] ?? model<IUser>("User", UserSchema);
