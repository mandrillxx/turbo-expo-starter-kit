import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  test: publicProcedure.mutation(async ({ ctx }) => {
    return "test";
  }),
  test2: protectedProcedure.mutation(async ({ ctx }) => {
    return "test2";
  }),
});
