import { store } from "@/redux/store";
import axiosInstance from "./axiosInstance";
import { setChats } from "@/redux/chatReducer/chatReducer";
import { showToast } from "@/utils/commonFunction";
import { Colors } from "./Colors";
import { router } from "expo-router";

export const handleRegister = async ({
  displayName,
  pin,
  password,
  username,
  setIsLoading,
}: {
  displayName: string;
  pin: string;
  setIsLoading: (loading: boolean) => void;
  password: string;
  username: string;
}) => {
  try {
    setIsLoading(true);
    const response = await axiosInstance.post("/user/register", { displayName, pin, password, username });
    if (response.data.success) {
      showToast({ message: "Registration successful", color: Colors.white, background: Colors.primary });
      router.replace("/(auth)");
    }
  } catch (error: any) {
    // console.error("Registration error", JSON.stringify(error.response?.data, null, 2));
    showToast({ message: error.response?.data.message, color: Colors.white, background: Colors.primary });
  } finally {
    setIsLoading(false);
  }
};

export const getChats = async () => {
  await axiosInstance
    .get("/chat")
    .then((response) => {
      // console.log("chats", JSON.stringify(response.data, null, 2));
      store.dispatch(setChats(response.data));
    })
    .catch((error) => {
      console.log("error to get chats", JSON.stringify(error.response.data, null, 2));
    });
};

// export const InitialMessagesLoad = async (chatId: string) => {
//   await axiosInstance
//     .get("/message/get-messages", {
//       params: {
//         chatId: chatId,
//         limit: 2,
//         skip: 2,
//       },
//     })
//     .then((response) => {
//       console.log("messages", JSON.stringify(response.data, null, 2));
//       store.dispatch(setMessages({ chatId, messages: response.data.data.reverse() }));
//     })
//     .catch((error) => {
//       console.log("error", JSON.stringify(error.response.data, null, 2));
//     });
// };
