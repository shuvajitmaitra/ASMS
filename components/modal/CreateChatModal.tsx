import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ReactNativeModal from "react-native-modal";
import { Colors } from "@/constants/Colors";
import InputField from "../ui/InputField";
import axiosInstance from "@/constants/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Grabber from "../ui/Grabber";
import { handleShare } from "@/utils/commonFunction";

const CreateChatModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [hashId, setHashId] = useState<string>("");
  const dispatch = useDispatch();

  const handleCreateChat = () => {
    axiosInstance
      .post("/chat/create", {
        hash: hashId,
      })
      .then((response) => {
        console.log("response.data", JSON.stringify(response.data, null, 2));
        // dispatch(setChats(response.data))
        onClose();
      })
      .catch((error) => {
        console.log("error to create chat", JSON.stringify(error.response.data, null, 2));
      });
  };
  return (
    <ReactNativeModal
      style={{ margin: 0, justifyContent: "flex-end" }}
      statusBarTranslucent={true}
      isVisible={visible}
      onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <Grabber />
        <InputField
          label="Paste your friends Hash ID"
          value={hashId}
          onChangeText={(text: string) => {
            setHashId(text);
          }}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text>Invite to your friends</Text>
        </TouchableOpacity>
        <Button title="Create Chat" onPress={handleCreateChat} />
      </View>
    </ReactNativeModal>
  );
};

export default CreateChatModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});
