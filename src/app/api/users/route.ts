import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { getHashedPassword } from "@/app/utils/bcrypt";
import { desc } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const dbUsers = await db.query.users.findMany({
    columns: {
      id: true,
      username: true,
      createdAt: true,
      profileImageUrl: true,
    },
    limit,
    offset,
    orderBy: desc(users.createdAt),
  });

  const userCount = await db.$count(users);

  return new Response(JSON.stringify({ users: dbUsers, userCount }));
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  if (!username) {
    throw new Error("Username is required");
  }

  const passwordHash = await getHashedPassword(password!);

  await db.insert(users).values({ username, passwordHash });

  return new Response("User created");
}
