import { useStore } from "@/store";
import { SplashScreen, useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from ".";

type AuthError = {
  code?: string | undefined;
  message?: string | undefined;
  status: number;
  statusText: string;
};

type AuthContextProps = {
  initialized?: boolean;
  signUp: ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => Promise<AuthError | null>;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<AuthError | null>;
  signInWithGoogle: () => Promise<AuthError | null>;
  signInWithApple: () => Promise<AuthError | null>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  initialized: false,
  signUp: async () => null,
  signInWithPassword: async () => null,
  signInWithGoogle: async () => null,
  signInWithApple: async () => null,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const setSession = useStore((state) => state.setSession);
  const session = authClient.useSession();

  async function signUp({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) {
    const res = await authClient.signUp.email({
      email,
      password,
      name: username,
    });
    return res.error;
  }

  async function signInWithGoogle() {
    const res = await authClient.signIn.social({
      provider: "google",
      callbackURL: "hotshotqq://",
    });
    return res.error;
  }

  async function signInWithApple() {
    const res = await authClient.signIn.social({
      provider: "apple",
    });
    return res.error;
  }

  async function signInWithPassword(email: string, password: string) {
    const res = await authClient.signIn.email({
      email,
      password,
    });
    return res.error;
  }

  async function signOut() {
    await authClient.signOut();
  }

  useEffect(() => {
    if (!session.isPending) {
      setSession(session.data ?? null);
      setInitialized(true);
    }
  }, [session.data, session.isPending]);

  useEffect(() => {
    if (!initialized) return;

    // const inProtectedGroup = segments[0] !== "welcome";

    // if (session.data && !inProtectedGroup) {
    // router.replace("/(root)/");
    // } else if (!session.data) {
    //   router.replace("/welcome");
    // }

    router.replace("/");

    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, [initialized, session.data]);

  if (!initialized) return null;

  return (
    <AuthContext.Provider
      value={{
        initialized,
        signUp,
        signInWithPassword,
        signOut,
        signInWithGoogle,
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
