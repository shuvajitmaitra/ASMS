import { Stack } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function AuthRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Sign in",
          headerShown: false,
          animation: "slide_from_bottom",
          contentStyle: { backgroundColor: Colors.bg },
        }}
      />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign up", headerShown: false, animation: "slide_from_bottom" }} />
      <Stack.Screen name="recover" options={{ headerTitle: "Reset password", headerShown: false, animation: "slide_from_bottom" }} />
    </Stack>
  );
}
