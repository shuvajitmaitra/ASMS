import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageData {
  replyTo: null | string;
  _id: string;
  sender: {
    _id: string;
    displayName: string;
    profilePicture: string;
  };
  text: string;
  chat: string;
  image: string;
  audio: string;
  video: string;
  reactionCount: number;
  myReactions: string[];
  allReactions: Record<string, { _id: string; user: string }>;
  editedAt: null | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reactions: { _id: string; user: string }[];
}
export interface MessageState {
  allMessages: Record<string, MessageData[]>;
}

// Initial state with type annotation
const initialState: MessageState = {
  allMessages: {},
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllMessages: (state, action: PayloadAction<{ chatId: string; messages: MessageData[] }>) => {
      const { chatId, messages } = action.payload;
      state.allMessages = { ...state.allMessages, [chatId]: messages };
    },
  },
});

export const { setAllMessages } = messageSlice.actions;

export default messageSlice.reducer;
