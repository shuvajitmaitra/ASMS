import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import axiosInstance from "@/constants/axiosInstance";
import { TMessage } from "@/types/message/message.type";

const MessageScreen = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const { hash } = useSelector((state: RootState) => state.user);
  const { top, bottom } = useSafeAreaInsets();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat?._id) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get("/message/get-messages", {
          params: {
            chatId: selectedChat._id,
          },
        });
        setMessages(response.data.data.reverse());
      } catch (error: any) {
        if (error.response) {
          console.error("Error Response Data:", JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // Function to send a new message
  const handleSend = async () => {
    if (!messageText.trim() || !selectedChat?._id) return;

    try {
      const response = await axiosInstance.post("/message/send", {
        senderId: hash,
        chatId: selectedChat._id,
        text: messageText,
      });

      // Assuming the API returns the created message under "message"

      console.log("response.data", JSON.stringify(response.data, null, 2));
      const newMessage: TMessage = response.data.data;

      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessageText("");

      // Scroll to bottom after sending a message
      // flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
    } catch (error: any) {
      console.log("error", JSON.stringify(error.response.data, null, 2));
    }
  };

  // Render each message bubble
  const renderMessageItem = ({ item }: { item: TMessage }) => {
    const isCurrentUser = item?.sender?._id === hash;
    return (
      <View style={[styles.messageBubble, isCurrentUser ? styles.sentBubble : styles.receivedBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={styles.header}>
          <Feather onPress={() => router.back()} name="arrow-left" size={24} color={Colors.white} />
          <Text style={styles.headerTitle}>{selectedChat?.isGroupChat ? selectedChat.chatName : selectedChat?.otherUser.displayName}</Text>
        </View>

        {/* Messages List */}
        <View style={styles.messagesContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.white} />
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item._id}
              renderItem={renderMessageItem}
              contentContainerStyle={styles.flatListContent}
              // Optionally invert the list if your API returns messages in chronological order
              inverted
            />
          )}
        </View>

        {/* Message Input */}
        <View style={[styles.inputContainer, { paddingBottom: bottom }]}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            placeholderTextColor="#ccc"
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Feather name="send" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    marginLeft: 10,
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  sentBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.bg, // Change as desired for sent messages
  },
  receivedBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#555", // Change as desired for received messages
  },
  messageText: {
    color: Colors.white,
    fontSize: 16,
  },
  timeText: {
    color: "#ccc",
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: Colors.bg,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    color: Colors.white,
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: Colors.bg,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
