import { store } from "@/redux/store";
import axiosInstance from "./axiosInstance";
import { setHash } from "@/redux/userReducer/userReducer";

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
