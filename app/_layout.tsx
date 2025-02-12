import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/toastConfig";
import { GlobalProvider } from "@/hooks/useGlobalContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Provider store={store}>
        <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
          <Slot />
          <StatusBar style="auto" />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </Provider>
    </GlobalProvider>
  );
}
