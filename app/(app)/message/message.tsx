import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import axiosInstance from "@/constants/axiosInstance";

const MessageScreen = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const { top } = useSafeAreaInsets();
  console.log("selectedChat._id", JSON.stringify(selectedChat?._id, null, 2));
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axiosInstance.get("/message/get-messages", {
          params: {
            chatId: selectedChat?._id || "defaultChatId", // Replace "defaultChatId" as needed
          },
        });
        console.log("Response Data:", JSON.stringify(response.data, null, 2));
      } catch (error: any) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error Response Data:", JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
        } else {
          // Something else happened while setting up the request
          console.error("Error:", error.message);
        }
      }
    };

    getChats();

    // Optional cleanup function (if needed)
    return () => {
      // Cleanup logic here
    };
  }, [selectedChat]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary, paddingTop: top }}>
      <View style={styles.header}>
        <Feather
          onPress={() => {
            router.back();
          }}
          name="arrow-left"
          size={24}
          color={Colors.white}
        />
        <Text>{selectedChat?.isGroupChat ? selectedChat.chatName : selectedChat?.otherUser.displayName}</Text>
      </View>
      <Text>MessageScreen</Text>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  //Message top part style
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
});
