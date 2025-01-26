import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
export interface UserState {
  displayName: string;
  hash: string;
  pin: string;
}

// Initial state with type annotation
const initialState: UserState = {
  displayName: "",
  hash: "",
  pin: "",
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
  },
});

export const { setPin, setHash, setDisplayName } = userSlice.actions;

export default userSlice.reducer;
