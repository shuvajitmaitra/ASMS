import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

const CreateChatScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>CreateChatScreen</Text>
    </View>
  );
};

export default CreateChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg,
  },
});
