import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { TMessage } from "@/types/message/message.type";

const SingleMessage = ({ message, isCurrentUser }: { message: TMessage; isCurrentUser: boolean }) => {
  return (
    <View style={[styles.messageBubble, isCurrentUser ? styles.sentBubble : styles.receivedBubble]}>
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.timeText}>
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

export default SingleMessage;

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
  },
  sentBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary, // Change as desired for sent messages
  },
  receivedBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#555", // Change as desired for received messages
  },
  messageText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "right",
  },
  timeText: {
    color: "#ffffff",
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
  },
});
