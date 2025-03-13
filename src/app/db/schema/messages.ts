// import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
// import { createId } from "@paralleldrive/cuid2";

// const messages = sqliteTable("messages", {
//   id: text("id", { length: 128 })
//     .primaryKey()
//     .$default(() => createId()),
//   message: text("message").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .notNull()
//     .$default(() => new Date()),
// });
