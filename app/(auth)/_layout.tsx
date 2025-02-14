import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "@/hooks/useGlobalContext";

export default function AuthRoutesLayout() {
  const { globalData } = useGlobalContext();

  if (!globalData.isLoaded) return null;

  if (globalData.username && globalData.pin && globalData.password) return <Redirect href="/(app)" />;

  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                // NEW: Make the large title transparent to match the background.
                backgroundColor: "transparent",
              },
            }),
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Sign in" }} />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign up" }} />
      <Stack.Screen name="reset-password" options={{ headerTitle: "Reset password" }} />
    </Stack>
  );
}
