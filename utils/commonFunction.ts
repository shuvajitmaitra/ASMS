import { resetStore } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";
import { Share } from "react-native";

export const handleLogout = () => {
  resetStore(); // Directly call the resetStore function
  AsyncStorage.clear();
  router.replace("/login");
};

type ToastOptions = {
  message: string;
  color?: string;
  background?: string;
};

export const showToast = ({ message, color, background }: ToastOptions): void => {
  Toast.show({
    type: "tomatoToast", // This matches the key defined in toastConfig
    text1: message,
    position: "bottom",
    props: { color, background },
  });
};

export const handleCopyText = async (text: string) => {
  if (!text) return;
  await Clipboard.setStringAsync(text);
};

export const handleShare = async (text: string) => {
  await Share.share({
    message: text,
  });
};
