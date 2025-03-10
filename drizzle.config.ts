import { defineConfig } from "drizzle-kit";
import env from "@/env";

export default defineConfig({
  schema: "./src/app/db/schema/index.ts",
  out: "./src/app/db/migrations",
  dialect: "sqlite",
  //driver: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    token: env.TURSO_AUTH_TOKEN,
  },
});
