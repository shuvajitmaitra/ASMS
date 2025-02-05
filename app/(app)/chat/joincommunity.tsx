import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import InputField from "@/components/ui/InputField";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";

const JoinCommunityScreen = () => {
  const [communityHash, setCommunityHash] = useState("");

  const handleJoinCommunity = () => {
    // Implement join community logic here
    console.log("Joining community with hash:", communityHash);
  };

  return (
    <View style={styles.container}>
      <Header title="Join Community" onBackPress={() => router.back()} />

      <StatusBar style="auto" />
      <View style={styles.content}>
        <Pressable style={styles.joinChatButtonContainer} onPress={() => {}}>
          <Ionicons name="chatbubble-ellipses" size={60} color={Colors.white} />
          <Text style={styles.joinChatButtonText}>Join ASMS</Text>
          <Text style={styles.joinChatButtonText}>Community</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joinChatButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  joinChatButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 7,
    backgroundColor: Colors.primary,
  },
  container: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
  backButton: {
    padding: 15,
    marginTop: 40, // Adjust based on your device's safe area
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  content: {
    padding: 15,
  },
});

export default JoinCommunityScreen;
