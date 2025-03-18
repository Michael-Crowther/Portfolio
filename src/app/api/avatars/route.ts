import { schema } from "@dicebear/core";
import { micah } from "@dicebear/collection";

export async function GET() {
  const options = {
    ...schema.properties,
    ...micah.schema.properties,
  };

  console.log(options);

  return new Response(JSON.stringify({ options }));
}
