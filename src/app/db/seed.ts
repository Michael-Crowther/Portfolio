import env from "@/env";
import { users } from "./schema";
import { generateFakeUsername } from "@/lib/helpers";
import { db } from ".";
import { getHashedPassword } from "../utils/bcrypt";

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function seed() {
  console.log("Seeding the database 🌱");

  const passwordHash = await getHashedPassword("1234");

  const dbFakeUsers: (typeof users.$inferInsert)[] = [];

  // Generate an array of fake user objects
  const fakeUsers = Array.from({ length: 50 }, () => ({
    username: generateFakeUsername(),
  }));

  //create fake users
  for (const user of fakeUsers) {
    dbFakeUsers.push({ ...user, passwordHash });
  }

  await db.insert(users).values(dbFakeUsers).returning({ id: users.id });
}

seed()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
