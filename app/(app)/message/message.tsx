import React, { useState, useRef, useLayoutEffect } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import axiosInstance from "@/constants/axiosInstance";
import { TMessage } from "@/types/message/message.type";
import { TError } from "@/types/error/error.type";
import { addNewMessage, setMessages } from "@/redux/messageReducer/messageReducer";
import { padding } from "@/constants/sizes";

const MessageScreen = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const { messages } = useSelector((state: RootState) => state.message);
  const { hash } = useSelector((state: RootState) => state.user);
  const { top, bottom } = useSafeAreaInsets();
  const [messageText, setMessageText] = useState<string>("");
  const flatListRef = useRef<FlatList>(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat?._id) return;
      try {
        const response = await axiosInstance.get("/message/get-messages", {
          params: {
            chatId: selectedChat._id,
            limit: 10,
            page: page,
          },
        });
        dispatch(setMessages({ chatId: selectedChat._id, messages: response.data.data, page: page }));
      } catch (error: TError | any) {
        console.log("error", JSON.stringify(error.response.data, null, 2));
      }
    };

    fetchMessages();
  }, [page, selectedChat?._id]);

  const handleSend = async () => {
    if (!messageText.trim() || !selectedChat?._id) return;

    try {
      const response = await axiosInstance.post("/message/send", {
        chatId: selectedChat._id,
        text: messageText,
      });

      const newMessage: TMessage = response.data.data;

      dispatch(addNewMessage({ chatId: selectedChat._id, message: newMessage }));
      setMessageText("");
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
      keyboardVerticalOffset={0}
    >
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={styles.header}>
          <Feather onPress={() => router.back()} name="arrow-left" size={24} color={Colors.white} />
          <Text style={styles.headerTitle}>{selectedChat?.isGroupChat ? selectedChat.chatName : selectedChat?.otherUser.displayName}</Text>
        </View>

        {/* Messages List */}
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages && selectedChat ? messages[selectedChat._id] || [] : []}
            keyExtractor={(item) => item._id}
            renderItem={renderMessageItem}
            contentContainerStyle={styles.flatListContent}
            inverted={true}
            onEndReached={() => setPage((prevPage) => prevPage + 1)}
            onEndReachedThreshold={0.5}
          />
        </View>

        <View style={[styles.inputContainer, Platform.OS === "ios" && { marginBottom: 10 }]}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            placeholderTextColor="#ccc"
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={30} color={Colors.primary} />
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
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  headerTitle: {
    marginLeft: 10,
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: padding.default,
    backgroundColor: Colors.bg,
  },
  flatListContent: {
    gap: 10,
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: "80%",
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
    paddingLeft: padding.default,
    paddingRight: padding.small,
    paddingVertical: 8,
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
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
