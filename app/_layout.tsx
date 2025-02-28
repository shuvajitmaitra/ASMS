import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/toastConfig";
import { GlobalProvider } from "@/hooks/useGlobalContext";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "@/hooks/useSocket";

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
        <PersistGate loading={null} persistor={persistor}>
          <SocketProvider>
            <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
              <Slot />
              <StatusBar style="auto" />
              <Toast config={toastConfig} autoHide={true} visibilityTime={1500} />
            </ThemeProvider>
          </SocketProvider>
        </PersistGate>
      </Provider>
    </GlobalProvider>
  );
}
