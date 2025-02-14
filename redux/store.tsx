import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./combineReducer/combineReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "message", "chat"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const resetStore = () => {
  persistor.purge(); // Clear persisted storage
  store.dispatch({ type: "RESET_APP" }); // Dispatch a reset action
};
