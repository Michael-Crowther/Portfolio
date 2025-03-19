import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { getHashedPassword } from "@/app/utils/bcrypt";
import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { faker } from "@faker-js/faker";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const avatarSvg = createAvatar(avataaars, {
    seed: "1234",

    skinColor: [searchParams.get("skinColor") ?? "d08b5b"],
    //@ts-expect-error no type
    top: [searchParams.get("top") ?? undefined],
    //@ts-expect-error no type
    clothesColor: [searchParams.get("clothesColor") ?? undefined],
    //@ts-expect-error no type
    clothing: [searchParams.get("clothing") ?? undefined],
    //@ts-expect-error no type
    eyebrows: [searchParams.get("eyebrows") ?? "default"],
    //@ts-expect-error no type
    eyes: [searchParams.get("eyes") ?? "default"],
    //@ts-expect-error no type
    hatColor: [searchParams.get("hatColor") ?? undefined],
    //@ts-expect-error no type
    mouth: [searchParams.get("mouth") ?? undefined],
  });

  // Convert to raw SVG string
  const svgString = avatarSvg.toString();

  // Optionally encode as a data URI so we can display it easily in an <img> tag
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgString).toString(
    "base64"
  )}`;

  return new Response(JSON.stringify({ svg: dataUri }));
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);

  const avatarSvg = createAvatar(avataaars, {
    seed: "1234",

    skinColor: [searchParams.get("skinColor") ?? "d08b5b"],
    //@ts-expect-error no type
    top: [searchParams.get("top") ?? undefined],
    //@ts-expect-error no type
    clothesColor: [searchParams.get("clothesColor") ?? undefined],
    //@ts-expect-error no type
    clothing: [searchParams.get("clothing") ?? undefined],
    //@ts-expect-error no type
    eyebrows: [searchParams.get("eyebrows") ?? "default"],
    //@ts-expect-error no type
    eyes: [searchParams.get("eyes") ?? "default"],
    //@ts-expect-error no type
    hatColor: [searchParams.get("hatColor") ?? undefined],
    //@ts-expect-error no type
    mouth: [searchParams.get("mouth") ?? undefined],
  });

  // Convert to raw SVG string
  const svgString = avatarSvg.toString();

  // Optionally encode as a data URI so we can display it easily in an <img> tag
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgString).toString(
    "base64"
  )}`;

  const passwordHash = await getHashedPassword("1234");

  await db.insert(users).values({
    username: `${faker.person.firstName().slice(0, 6)} ${faker.person
      .lastName()
      .slice(0, 6)}`,
    profileImageUrl: dataUri,
    passwordHash,
  });

  return new Response(JSON.stringify({ message: "User has been created." }));
}
