import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import Grabber from "@/components/ui/Grabber";
import { handleLogout } from "@/utils/commonFunction";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar />
        <Grabber />
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
  subContainer: {},
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "red",
    flex: 1,
  },
});
