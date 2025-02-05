import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface ChatButtonProps {
  icon?: string;
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const ChatButton: React.FC<ChatButtonProps> = ({ icon = "chat", title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <View style={styles.iconContainer}>
        <Entypo name={icon as any} size={24} color="black" />
      </View>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: Colors.body,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default ChatButton;
