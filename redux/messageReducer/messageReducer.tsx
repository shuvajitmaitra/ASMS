import { TMessage } from "@/types/message/message.type";
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

type TMessages = { [key: string]: TMessage[] };
export interface MessageState {
  messages: TMessages | null;
}

// Initial state with type annotation
const initialState: MessageState = {
  messages: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ chatId: string; messages: TMessage[]; page: number }>) => {
      const { chatId, messages, page } = action.payload;
      if (!state.messages) {
        state.messages = {};
      }

      if (page === 1) {
        state.messages[chatId] = messages;
      } else {
        state.messages[chatId] = [...(state.messages[chatId] || []), ...messages];
      }
    },
    addNewMessage: (state, action: PayloadAction<{ chatId: string; message: TMessage }>) => {
      const { chatId, message } = action.payload;
      if (!state.messages) {
        state.messages = {};
      }
      state.messages[chatId] = [message, ...(state.messages[chatId] || [])];
    },
  },
});

export const { setMessages, addNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
