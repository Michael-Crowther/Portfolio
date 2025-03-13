export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get("message");

  if (!message) {
    throw new Error("Message is required");
  }
}
