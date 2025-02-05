import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import InputField from "@/components/ui/InputField";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedChat } from "@/redux/chatReducer/chatReducer";
import { env } from "@/constants/environment";
import axiosInstance from "@/constants/axiosInstance";

const JoinCommunityScreen = () => {
  const { chats } = useSelector((state: RootState) => state.chat);
  const { hash } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const joinCommunity = () => {
    if (!hash) return;
    console.log("hash", JSON.stringify(hash, null, 2));

    axiosInstance
      .put("/chat/join-default-community", { userId: hash })
      .then((res) => {
        if (res.status === 404) {
          alert("Default community not found!");
        }
        console.log("Response:", res.data);
      })
      .catch((error) => {
        console.error("Join error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to join community");
      });
  };
  const handleJoinCommunity = () => {
    const chat = chats.find((chat) => chat._id === env.defaultCommunityId);

    if (chat?._id) {
      dispatch(setSelectedChat(chat));
      router.push(`/message/message`);
    } else {
      joinCommunity();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Join Community" onBackPress={() => router.back()} />

      <StatusBar style="auto" />
      <View style={styles.content}>
        <Pressable
          style={styles.joinChatButtonContainer}
          onPress={() => {
            handleJoinCommunity();
          }}
        >
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
