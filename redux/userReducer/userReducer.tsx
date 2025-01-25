import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state
export interface UserState {
  displayName: string;
  email: string;
}

// Initial state with type annotation
const initialState: UserState = {
  displayName: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.displayName = action.payload.name;
      state.email = action.payload.email;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
  },
});

export const { setUser, setDisplayName } = userSlice.actions;

export default userSlice.reducer;
