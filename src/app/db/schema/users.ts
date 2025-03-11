import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

const users = sqliteTable("users", {
  id: text("id", { length: 128 })
    .primaryKey()
    .$default(() => createId()),
  username: text("username").notNull(),
  profileImageUrl: text("profile_image_url")
    .default("https://github.com/shadcn.png")
    .notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export default users;
