import { Hono } from "hono";
import { auth } from "@repo/auth";
import { trpcServer } from "@hono/trpc-server";
import { appRouter, createTRPCContext } from "@repo/trpc";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>({});

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    endpoint: "/trpc",
    createContext: (opts, c) => {
      const user = c.get("user");
      return createTRPCContext({
        headers: c.req.raw.headers,
        user,
      });
    },
    onError({ error, path }) {
      console.error(`>>> tRPC Error on ${path}: ${error}`);
    },
  })
);

export default app;
