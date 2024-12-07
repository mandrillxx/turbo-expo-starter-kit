import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://192.168.1.244:3000/auth",
  plugins: [
    expoClient({
      scheme: "hotshotqq",
      storagePrefix: "hotshotqq_auth",
      disableCache: true,
    }),
    usernameClient(),
  ],
});

export type Session = typeof authClient.$Infer.Session;
