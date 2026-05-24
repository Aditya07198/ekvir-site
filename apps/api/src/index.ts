import "dotenv/config";
import { createApp } from "./app";
import { connectDB } from "@ekvir/db/connection";

const PORT = process.env["PORT"] ?? 5000;
const MONGO_URI = process.env["MONGO_URI"];

if (!MONGO_URI) {
  console.error("[api] MONGO_URI is not set");
  process.exit(1);
}

async function start() {
  await connectDB(MONGO_URI as string);

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`[api] Running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("[api] Startup failed:", err);
  process.exit(1);
});
