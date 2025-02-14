import { TUser } from "@/types/user/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  pin: string;
  user: TUser | null;
  refreshToken: string;
  accessToken: string;
}

const initialState: UserState = {
  pin: "",
  user: null,
  refreshToken: "",
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setPin, setUser, setRefreshToken, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
