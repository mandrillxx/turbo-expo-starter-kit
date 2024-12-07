import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  test: publicProcedure.mutation(async ({ ctx }) => {
    return "test";
  }),
});
