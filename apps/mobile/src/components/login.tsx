import { useAuth } from "@/lib/auth/auth-provider";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { View } from "react-native";

export function Login() {
  const { signInWithPassword, signUp, signOut } = useAuth();

  async function handleSignIn() {
    await signInWithPassword("test@test.com", "password");
  }

  async function handleSignUp() {
    await signUp({
      email: "test@test.com",
      username: "test",
      password: "password",
    });
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Button onPress={handleSignIn}>
        <Text>Sign In</Text>
      </Button>
      <Button onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </Button>
      <Button onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  );
}
