import { Button, Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReactNativeModal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import InputField from "../ui/InputField";
import axiosInstance from "@/constants/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "@/redux/chatReducer/chatReducer";
import { RootState } from "@/redux/store";

const CreateChatModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [hashId, setHashId] = useState<string>("");
  const dispatch = useDispatch();
  const { hash } = useSelector((state: RootState) => state.user);

  const handleCreateChat = () => {
    axiosInstance
      .post("/chat/create", {
        hash: hashId,
        myHash: hash,
      })
      .then((response) => {
        console.log("response.data", JSON.stringify(response.data, null, 2));
        // dispatch(setChats(response.data))
        onClose();
      })
      .catch((error) => {
        console.log("error", JSON.stringify(error.response.data, null, 2));
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
        <Feather style={styles.closeButton} onPress={onClose} name="x-circle" size={30} color={Colors.white} />
        <InputField
          label="Paste your friends Hash ID"
          value={hashId}
          onChangeText={(text: string) => {
            setHashId(text);
          }}
        />
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
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});
