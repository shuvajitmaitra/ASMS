import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="message/message"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="profile/profile"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bg },
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          gestureEnabled: true,
          sheetCornerRadius: 20,
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="chat/createchat"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat/joincommunity"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
          presentation: "modal",
          title: "tessss",
        }}
      />
      {/* <Stack.Screen
        name="screens/joincommunity"
        options={{
          // headerShown: false,
          animation: "fade",
        }}
      /> */}
    </Stack>
  );
}
