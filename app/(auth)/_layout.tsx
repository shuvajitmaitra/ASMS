import { Stack } from "expo-router";

export default function AuthRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Sign in" }} />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign up" }} />
      <Stack.Screen name="recover" options={{ headerTitle: "Reset password" }} />
    </Stack>
  );
}
