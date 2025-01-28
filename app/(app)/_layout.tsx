import { Redirect, router, Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { resetStore, RootState } from "@/redux/store";
import { useEffect } from "react";
import { setHash } from "@/redux/userReducer/userReducer";
import Header from "@/components/ui/Header";

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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="message/message" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat/createchat"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          header: () => <Header title="Create Chat" onBackPress={() => router.back()} />,
        }}
      />
    </Stack>
  );
}
