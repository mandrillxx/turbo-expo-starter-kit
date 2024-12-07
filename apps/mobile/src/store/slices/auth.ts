import type { StateCreator } from "zustand";
import type { Session } from "@/lib/auth";
import type { DatabaseUser } from "@repo/db";

export interface AuthSlice {
  session: Session | null;
  user: DatabaseUser | null;
  setSession: (session: Session | null) => void;
  clearAuth: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  session: null,
  user: null,
  setSession: (session) =>
    set(() => ({ session, user: session?.user ?? null })),
  clearAuth: () => set(() => ({ session: null, user: null })),
});
