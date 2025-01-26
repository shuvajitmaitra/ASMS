import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { resetStore, RootState } from "@/redux/store";
import { useEffect } from "react";

export default function AppLayout() {
  const { hash } = useSelector((state: RootState) => state.user);
  // useEffect(() => {
  //   resetStore();
  //   return () => {};
  // }, []);

  if (!hash) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="message" options={{ headerShown: false }} />
    </Stack>
  );
}
