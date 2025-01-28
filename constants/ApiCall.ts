import { store } from "@/redux/store";
import axiosInstance from "./axiosInstance";
import { setHash, setPin } from "@/redux/userReducer/userReducer";
import { setChats } from "@/redux/chatReducer/chatReducer";

export const handleRegister = async ({ displayName, pin }: { displayName: string; pin: string }) => {
  await axiosInstance
    .post("/user/register", { displayName, pin })
    .then((response) => {
      console.log("response.data", JSON.stringify(response.data, null, 2));
      store.dispatch(setHash(response.data.hash));
    })
    .catch((error) => {
      console.log("error", JSON.stringify(error.response.data, null, 2));
    });
};

export const handleLogin = async ({ hash, pin }: { hash: string; pin: string }) => {
  await axiosInstance
    .post("/user/login", { hash, pin })
    .then((response) => {
      console.log("response.data", JSON.stringify(response.data, null, 2));
      store.dispatch(setHash(response.data.hash));
      store.dispatch(setPin(response.data.pin));
    })
    .catch((error) => {
      console.log("error", JSON.stringify(error.response.data, null, 2));
    });
};

export const getChats = async () => {
  await axiosInstance
    .get("/chat")
    .then((response) => {
      console.log("response.data", JSON.stringify(response.data, null, 2));
      store.dispatch(setChats(response.data));
    })
    .catch((error) => {
      console.log("error", JSON.stringify(error.response.data, null, 2));
    });
};
