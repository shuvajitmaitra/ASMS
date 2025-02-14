import React, { useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Using Ionicons and MaterialIcons
import { getChats } from "@/constants/ApiCall";
import { setChats, setSelectedChat } from "@/redux/chatReducer/chatReducer";
import { RootState } from "@/redux/store";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

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
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Union type for chats
type ChatData = GroupChatData | DirectChatData;

const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { chats }: { chats: ChatData[] } = useSelector((state: RootState) => state.chat);

  useLayoutEffect(() => {
    console.log("chats", JSON.stringify(chats, null, 2));
    getChats();
    return () => {
      // Clean up if necessary
      // dispatch(setChats([]));
    };
  }, []);

  const handleChatPress = (chat: ChatData) => {
    dispatch(setSelectedChat(chat));
    router.push(`/message/message`);
  };

  const renderItem = ({ item }: { item: ChatData }) => (
    <TouchableOpacity onPress={() => handleChatPress(item)} style={styles.chatContainer}>
      {/* <Image
        source={{ uri: item.isGroupChat ? "https://via.placeholder.com/50" : item.otherUser.profilePicture }}
        style={styles.profileImage}
      /> */}
      <View style={styles.profileImage} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.isGroupChat ? item.chatName : item.otherUser.displayName}</Text>
        {/* Add a placeholder for the last message or status */}
        <Text style={styles.chatStatus}>
          {item.isGroupChat ? `${item.membersCount} members` : item.otherUser.isActive ? "Online" : "Offline"}
        </Text>
      </View>
      {item?.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item?.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search */}
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity onPress={() => router.push("/(app)/profile/profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#666" />
      </View>

      {/* Chat List */}
      <FlashList
        keyExtractor={(item) => item._id}
        data={chats}
        renderItem={renderItem}
        estimatedItemSize={80}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/(app)/chat/createchat")}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    height: 60,
    backgroundColor: Colors.primary, // Assuming you have a primary color defined
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 2, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100, // To avoid FAB overlap
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#ccc",
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  chatStatus: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
