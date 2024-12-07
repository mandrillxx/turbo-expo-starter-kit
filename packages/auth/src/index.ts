import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/db";
import { env } from "./env";
import { expo } from "@better-auth/expo";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [expo(), username()],
  appName: "mobile",
  trustedOrigins: ["hotshotqq://"],
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/auth",
  emailAndPassword: {
    enabled: true,
  },
});
