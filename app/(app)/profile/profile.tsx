import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: top }]}>
      <View style={styles.subContainer}>
        <StatusBar />
        <View>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    height: 40,
  },
  subContainer: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.bg,
    padding: 15,
  },
  container: {
    // justifyContent: "center",
    // alignItems: "center",
  },
});
