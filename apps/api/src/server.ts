// Vercel serverless entry-point.
// Exports the Express app as a default handler instead of calling listen().
import "dotenv/config";
import { createApp } from "./app";
import { connectDB } from "@ekvir/db/connection";

const MONGO_URI = process.env["MONGO_URI"];
if (!MONGO_URI) throw new Error("MONGO_URI is not set");

// connectDB is idempotent — safe to call on every cold start.
connectDB(MONGO_URI).catch(console.error);

export default createApp();
