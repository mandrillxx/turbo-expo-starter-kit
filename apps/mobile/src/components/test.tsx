import { api } from "@/lib/trpc/react";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { useState } from "react";

export function TestComponent() {
  const [enabled, setEnabled] = useState(false);
  const { mutate, data } = api.user.test.useMutation();
  const { data: me } = api.user.me.useQuery(undefined, { enabled });

  return (
    <Button
      onPress={() => {
        mutate();
        setEnabled(true);
      }}
    >
      <Text>
        Test {data} {me?.name}
      </Text>
    </Button>
  );
}
