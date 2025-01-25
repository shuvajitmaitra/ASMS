import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AppLayout() {
  const { displayName } = useSelector((state: RootState) => state.user);
  if (!displayName) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="message" options={{ headerShown: false }} />
    </Stack>
  );
}
