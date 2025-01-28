import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../userReducer/userReducer";
import chatReducer from "../chatReducer/chatReducer";

const appReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_APP") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
