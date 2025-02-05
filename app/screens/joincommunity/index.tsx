import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import InputField from "@/components/ui/InputField";
import { Ionicons } from "@expo/vector-icons";

const JoinCommunityScreen = () => {
  const [communityHash, setCommunityHash] = useState("");

  const handleJoinCommunity = () => {
    // Implement join community logic here
    console.log("Joining community with hash:", communityHash);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={Colors.white} />
      </TouchableOpacity>

      <StatusBar style="auto" />

      <View style={styles.content}>
        <Text style={styles.title}>Join Community</Text>
        <InputField
          label="Enter Community Hash"
          value={communityHash}
          onChangeText={setCommunityHash}
          placeholder="Paste community hash here"
        />

        {/* Add a button to join community */}
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
        <Text>hhhdhdhadjkdjkfsakajldf</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding: 20,
  },
});

export default JoinCommunityScreen;
