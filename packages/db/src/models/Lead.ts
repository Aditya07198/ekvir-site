import { Schema, model, models, Document } from "mongoose";

type LeadStatus = "new" | "contacted" | "qualified" | "rejected" | "hired";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  message?: string;
  status: LeadStatus;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    company: { type: String, trim: true, maxlength: 100 },
    industry: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "rejected", "hired"],
      default: "new",
    },
    source: { type: String, default: "website", trim: true },
  },
  { timestamps: true }
);

export const Lead = models["Lead"] ?? model<ILead>("Lead", LeadSchema);
