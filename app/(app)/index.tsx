import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { getChats } from "@/constants/ApiCall";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "@/redux/chatReducer/chatReducer";
import { FlashList } from "@shopify/flash-list";
import { RootState } from "@/redux/store";
import { Colors } from "@/constants/Colors";

// Define the type for each chat item
type UserData = {
  _id: string;
  displayName: string;
  profilePicture: string;
  role?: "admin" | "member";
  isIamBlocked?: boolean;
  amIBlocked?: boolean;
  isActive?: boolean;
};

type GroupChatData = {
  _id: string;
  chatName: string;
  isGroupChat: true;
  membersCount: number;
  unreadCount: number;
  myData: UserData;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type DirectChatData = {
  _id: string;
  isGroupChat: false;
  myData: UserData;
  otherUser: {
    _id: string;
    displayName: string;
    profilePicture: string;
    isActive: boolean;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Union type for chats
type ChatData = GroupChatData | DirectChatData;

const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();

  // Specify the type of `chats` as `ChatData[]`
  const { chats }: { chats: ChatData[] } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    getChats();

    return () => {
      dispatch(setChats([]));
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        keyExtractor={(item) => item._id}
        data={chats}
        renderItem={({ item }: { item: ChatData }) => (
          <View style={styles.chatContainer}>
            <Text style={styles.chatText}>{item.isGroupChat ? item.chatName : item.otherUser.displayName}</Text>
          </View>
        )}
        estimatedItemSize={10}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/(app)/chat/createchat")}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatContainer: {
    width: "100%",
    backgroundColor: "red",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  chatText: {
    fontSize: 16,
    marginVertical: 10,
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
