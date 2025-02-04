import { resetStore, store } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const handleLogout = () => {
  store.dispatch(resetStore());
  AsyncStorage.clear();
  router.replace("/login");
};
