import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB, disconnectDB } from "@ekvir/db/connection";
import { User } from "@ekvir/db/models";
import type { UserRole } from "@ekvir/db/models";

const MONGO_URI = process.env["MONGO_URI"];
if (!MONGO_URI) {
  console.error("[seed] MONGO_URI is not set");
  process.exit(1);
}

const USERS: { name: string; email: string; password: string; role: UserRole }[] = [
  {
    name: "Super Admin",
    email: "superadmin@ekvir.in",
    password: "SuperAdmin_Ekvir24",
    role: "superadmin",
  },
  {
    name: "Admin",
    email: "admin@ekvir.in",
    password: "Admin_Ekvir24",
    role: "admin",
  },
];

async function seed() {
  await connectDB(MONGO_URI as string);
  console.log("\n── EKVIR User Seed ─────────────────────────");

  for (const u of USERS) {
    const existing = await User.findOne({ email: u.email });
    if (existing) {
      console.log(`  ⚠  Already exists [${u.role}] ${u.email} — skipped`);
      continue;
    }
    const passwordHash = await bcrypt.hash(u.password, 12);
    await User.create({ name: u.name, email: u.email, passwordHash, role: u.role });
    console.log(`  ✓  Created [${u.role}] ${u.email}`);
    console.log(`     Password: ${u.password}`);
  }

  console.log("────────────────────────────────────────────\n");
  await disconnectDB();
}

seed().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
