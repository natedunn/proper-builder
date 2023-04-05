import { APIEvent, json } from "solid-start";

export function GET({ params }: APIEvent) {
  return json({ hello: "world" });
}
