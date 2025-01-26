import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ChatScreen</Text>
      <Button
        title="Next"
        onPress={() => {
          router.push("/message");
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/createchat")}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  addButtonText: {
    fontSize: 30,
    color: "#000",
  },
});
