import { schema } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

export async function GET() {
  const options = {
    ...schema.properties,
    ...avataaars.schema.properties,
  };

  console.log(options);

  return new Response(JSON.stringify({ options }));
}
