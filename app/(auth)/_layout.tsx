import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "@/hooks/useGlobalContext";

export default function AuthRoutesLayout() {
  const { globalData } = useGlobalContext();

  if (globalData.username && globalData.pin && globalData.password) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Sign in" }} />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign up" }} />
      <Stack.Screen name="recover" options={{ headerTitle: "Reset password" }} />
    </Stack>
  );
}
