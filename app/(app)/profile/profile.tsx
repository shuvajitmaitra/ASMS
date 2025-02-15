import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { handleLogout } from "@/utils/commonFunction";
import { margin, padding } from "@/constants/sizes";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
          style={styles.button}
        >
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
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 40,
    backgroundColor: Colors.primary,
  },
  subContainer: {
    padding: padding.default,
  },
  container: {
    backgroundColor: "#555",
    position: "relative",
  },
});
