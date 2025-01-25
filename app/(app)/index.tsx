import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const ChatScreen = () => {
  return (
    <View>
      <Text>ChatScreen</Text>
      <Button
        title="Next"
        onPress={() => {
          router.push("/message");
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
