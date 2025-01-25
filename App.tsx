import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
};

export default RootLayout;
