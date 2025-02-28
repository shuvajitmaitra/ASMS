import { Colors } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { router, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "expo-router";
export default function AppLayout() {
  const { accessToken } = useSelector((state: RootState) => state.user);

  if (!accessToken) {
    return <Redirect href="/(auth)" />;
  }

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
          animation: "slide_from_bottom",
          contentStyle: { backgroundColor: Colors.bg },
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
    </Stack>
  );
}
