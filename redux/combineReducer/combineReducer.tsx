import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../userReducer/userReducer";
import chatReducer from "../chatReducer/chatReducer";
import messageReducer from "../messageReducer/messageReducer";

const appReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  message: messageReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_APP") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
