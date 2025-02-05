import React, { useState, Suspense } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import CreateChatModal from "@/components/modal/CreateChatModal";
import { router } from "expo-router";
import Header from "@/components/ui/Header";
import ChatButton from "@/components/CreateChat/ChatButton";
import { handleShare } from "@/utils/commonFunction";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CreateChatScreen = () => {
  const [createPrivateChatVisible, setCreatePrivateChatVisible] = useState(false);
  const { hash } = useSelector((state: RootState) => state.user);

  const handleInviteFriend = () => {
    router.dismiss();
    handleShare(hash);
  };

  return (
    <Pressable onPress={() => router.back()} style={styles.container}>
      <View style={{ backgroundColor: Colors.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <Header title="Create Chat" onBackPress={() => router.back()} />
        <StatusBar style="auto" />

        <ChatButton title="Create private group" onPress={() => setCreatePrivateChatVisible(true)} />

        <ChatButton title="Join community" onPress={() => setCreatePrivateChatVisible(true)} icon="users" />

        <ChatButton title="Invite your friend" onPress={handleInviteFriend} icon="share" />

        <Suspense>
          <CreateChatModal visible={createPrivateChatVisible} onClose={() => setCreatePrivateChatVisible(false)} />
        </Suspense>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

export default CreateChatScreen;
