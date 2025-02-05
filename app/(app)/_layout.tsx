import { Redirect, router, Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { resetStore, RootState } from "@/redux/store";
import { useEffect } from "react";
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/Colors";
export default function AppLayout() {
  const { hash } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    // resetStore();
    // dispatch(setHash("67968683093d1d74816c8a51"));
    return () => {};
  }, []);

  if (!hash) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "red" },
        }}
      />
      <Stack.Screen
        name="message/message"
        options={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: "blue" },
        }}
      />
      <Stack.Screen
        name="profile/profile"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          presentation: "formSheet",
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
