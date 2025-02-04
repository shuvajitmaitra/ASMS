import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Grabber from "@/components/ui/Grabber";
import { handleLogout } from "@/utils/commonFunction";

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: top }]}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <StatusBar />
        <Grabber />

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
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
    position: "relative",
  },
  container: {
    // justifyContent: "center",
    // alignItems: "center",
  },
});
