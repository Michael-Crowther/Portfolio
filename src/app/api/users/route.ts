import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { getHashedPassword } from "@/app/utils/bcrypt";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const dbUsers = await db.query.users.findMany({
    columns: { id: true, username: true, createdAt: true },
    limit,
    offset,
  });

  const userCount = await db.$count(users);

  return new Response(JSON.stringify({ users: dbUsers, userCount }));
}

export async function POST(req: Request) {
  const { username, password } = new URL(req.url);

  const passwordHash = await getHashedPassword(password);

  await db.insert(users).values({ username, passwordHash });
}
