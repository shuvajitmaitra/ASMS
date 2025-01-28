import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for UserData
type UserData = {
  _id: string;
  displayName: string;
  profilePicture: string;
  role?: "admin" | "member";
  isIamBlocked?: boolean;
  amIBlocked?: boolean;
  isActive?: boolean;
};

// Define the types for chats
type GroupChatData = {
  _id: string;
  chatName: string;
  isGroupChat: true;
  membersCount: number;
  unreadCount: number;
  myData: UserData;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type DirectChatData = {
  _id: string;
  isGroupChat: false;
  myData: UserData;
  otherUser: {
    _id: string;
    displayName: string;
    profilePicture: string;
    isActive: boolean;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Union type for chat data
type ChatData = GroupChatData | DirectChatData;

// Define the shape of the chat state
interface ChatState {
  chats: ChatData[];
}

// Initial state
const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatData[]>) => {
      // Set the chats in the state
      state.chats = action.payload;
    },
  },
});

// Export actions
export const { setChats } = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;
