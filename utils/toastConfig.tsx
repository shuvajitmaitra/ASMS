import { Text, View } from "react-native";

/*
  1. Create the config
*/
export const toastConfig = {
  tomatoToast: ({
    text1 = "Hello World",
    props = {
      background: "#666666",
      color: "white",
    },
  }) => {
    return (
      <View
        style={{
          minHeight: 40,
          minWidth: "30%",
          backgroundColor: props.background || "#666666",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          paddingHorizontal: 25,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            color: props.color || "white",
            fontSize: 18,
          }}
        >
          {text1}
        </Text>
      </View>
    );
  },
};
