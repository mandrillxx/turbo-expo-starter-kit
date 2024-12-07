import type { Context } from "hono";
import { auth } from "./";

export async function currentUser(headers?: Headers) {
  const session = await auth.api.getSession({
    headers: headers ?? new Headers(),
  });

  return session?.user ?? null;
}
