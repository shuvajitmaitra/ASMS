import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { router } from "expo-router";

const MessageScreen = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const { top } = useSafeAreaInsets();

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
