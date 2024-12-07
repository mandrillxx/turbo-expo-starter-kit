import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/react";
import { Login } from "@/components/login";
import { TestComponent } from "@/components/test";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth";

export default function App() {
  const { data } = api.user.me.useQuery();
  const session = authClient.useSession();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="flex-1 justify-center items-center">
        <Text className="text-blue-500 text-3xl">
          Hello World {session.data?.user?.name}!
        </Text>
        <Button>
          <Text>Click me</Text>
        </Button>
        <Login />
        <TestComponent />
      </ScrollView>
    </SafeAreaView>
  );
}
