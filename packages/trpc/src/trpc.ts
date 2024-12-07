import { currentUser } from "@repo/auth/utils";
import type { DatabaseUser } from "@repo/db";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: {
  headers: Headers;
  user: DatabaseUser | null;
}) => {
  const user = opts.user ?? (await currentUser(opts.headers));
  const source = opts.headers.get("x-trpc-source") ?? "unknown";

  // console.log(">>> tRPC Request from", source, "by", user);

  return {
    user,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this.",
    });
  }
  return next({
    ctx: {
      user: { ...ctx.user },
    },
  });
});
