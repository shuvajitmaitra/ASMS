import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Suspense, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import CreateChatModal from "@/components/modal/CreateChatModal";
import InputField from "@/components/ui/InputField";
import { router } from "expo-router";

const CreateChatScreen = () => {
  const [createPrivateChatVisible, setCreatePrivateChatVisible] = useState(false);
  return (
    <Pressable onPress={() => router.back()} style={styles.container}>
      <View style={{ backgroundColor: Colors.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => setCreatePrivateChatVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Create privet chat</Text>
        </TouchableOpacity>

        <InputField label="Username" value="" onChangeText={() => {}} />
        <Text>zzz</Text>
        <Text>zzz</Text>
        <Text>zzz</Text>
        <Text>zzz</Text>
        <Text>zzz</Text>
        <Text>zzz</Text>
        <Text>zzz</Text>
        <Text>zzz</Text>
        <Suspense>
          <CreateChatModal visible={createPrivateChatVisible} onClose={() => setCreatePrivateChatVisible(false)} />
        </Suspense>
      </View>
    </Pressable>
  );
};

export default CreateChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    height: "100%",
    // flex: 1,
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
