import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const Grabber = () => {
  return <View style={styles.container} />;
};

export default Grabber;

const styles = StyleSheet.create({
  container: {
    height: 7,
    backgroundColor: Colors.primary,
    position: "absolute",
    width: 50,
    top: 7,
    alignSelf: "center",
    borderRadius: 10,
  },
});
