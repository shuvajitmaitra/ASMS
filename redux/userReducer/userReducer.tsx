import { TUser } from "@/types/user/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state

export interface UserState {
  displayName: string;
  hash: string;
  pin: string;
  user: TUser | null;
}

// Initial state with type annotation
const initialState: UserState = {
  displayName: "",
  hash: "",
  pin: "",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
    },
    setHash: (state, action: PayloadAction<string>) => {
      state.hash = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setPin, setHash, setDisplayName, setUser } = userSlice.actions;

export default userSlice.reducer;
