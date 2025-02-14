import { store } from "@/redux/store";
import axiosInstance from "./axiosInstance";
import { setHash, setPin } from "@/redux/userReducer/userReducer";
import { setChats } from "@/redux/chatReducer/chatReducer";
import { setMessages } from "@/redux/messageReducer/messageReducer";

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
    console.log("response.data", JSON.stringify(response.data, null, 2));
    store.dispatch(setHash(response.data.hash));
  } catch (error: any) {
    console.error("Registration error", JSON.stringify(error.response?.data, null, 2));
    // Optionally dispatch an error action or show a toast notification
    // store.dispatch(setRegistrationError(error.response?.data?.message || 'Registration failed'));
  } finally {
    setIsLoading(false);
  }
};

export const getChats = async () => {
  await axiosInstance
    .get("/chat")
    .then((response) => {
      console.log("chats", JSON.stringify(response.data, null, 2));
      store.dispatch(setChats(response.data));
    })
    .catch((error) => {
      console.log("error", JSON.stringify(error.response.data, null, 2));
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
