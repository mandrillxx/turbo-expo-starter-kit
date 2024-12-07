import type { AppRouter } from "@repo/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";
import { authClient } from "../auth";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0, // Disable retries to mimick production behavior
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: `${process.env.EXPO_PUBLIC_API_URL}/trpc`,
          transformer: superjson,
          headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "expo-react");
            const cookies = authClient.getCookie();
            if (cookies) {
              headers.set("Cookie", cookies);
            }
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
