import env from "@/env";
import { users } from "./schema";
import { generateFakeUsername } from "@/lib/helpers";
import { db } from ".";
import { getHashedPassword } from "../utils/bcrypt";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function seed() {
  console.log("Seeding the database 🌱");

  const passwordHash = await getHashedPassword("1234");

  const dbFakeUsers: (typeof users.$inferInsert)[] = [];

  // Generate an array of fake user objects
  const fakeUsers = Array.from({ length: 20 }, () => ({
    username: generateFakeUsername(),
  }));

  //create fake users
  for (const user of fakeUsers) {
    const avatarSvg = createAvatar(avataaars, {
      seed: user.username,
      accessories: [],
      eyes: ["default", "happy", "closed"],
      eyebrows: ["default", "defaultNatural"],
      mouth: ["default", "twinkle", "smile"],
      facialHair: ["beardLight", "moustacheFancy"],
    });

    // Convert to raw SVG string
    const svgString = avatarSvg.toString();

    // Optionally encode as a data URI so we can display it easily in an <img> tag
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(
      svgString
    ).toString("base64")}`;

    dbFakeUsers.push({ ...user, passwordHash, profileImageUrl: dataUri });
  }

  await db.insert(users).values(dbFakeUsers).returning({ id: users.id });
}

seed()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
