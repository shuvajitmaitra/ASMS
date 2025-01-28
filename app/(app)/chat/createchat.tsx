import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Suspense, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import CreateChatModal from "@/components/modal/CreateChatModal";

const CreateChatScreen = () => {
  const [createPrivateChatVisible, setCreatePrivateChatVisible] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => setCreatePrivateChatVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Create privet chat</Text>
      </TouchableOpacity>
      <Suspense>
        <CreateChatModal visible={createPrivateChatVisible} onClose={() => setCreatePrivateChatVisible(false)} />
      </Suspense>
    </View>
  );
};

export default CreateChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  button: {
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
});
