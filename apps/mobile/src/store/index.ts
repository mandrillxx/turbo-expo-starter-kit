import { create } from "zustand";
import { type AuthSlice, createAuthSlice } from "./slices/auth";

interface RootState extends AuthSlice {
  // Add other slices here as needed
}

export const useStore = create<RootState>()((...a) => ({
  ...createAuthSlice(...a),
  // Add other slices here as needed
}));

// Convenience hooks
export const useSession = () => useStore((state) => state.session);
export const useUser = () => useStore((state) => state.user);
