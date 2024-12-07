import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/react";
import { Login } from "@/components/login";
import { TestComponent } from "@/components/test";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth";
import { useState } from "react";

export default function App() {
  const { mutateAsync } = api.user.test2.useMutation();
  const session = authClient.useSession();
  const [data2, setData2] = useState<string | null>(null);

  async function handleClick() {
    const data2 = await mutateAsync();
    setData2(data2);
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="flex-1 justify-center items-center">
        <Text className="text-blue-500 text-3xl">
          Hello World {session.data?.user?.name}!
        </Text>
        <Text>{data2}</Text>
        <Button onPress={handleClick}>
          <Text>Click me</Text>
        </Button>
        <Login />
        <TestComponent />
      </ScrollView>
    </SafeAreaView>
  );
}
