import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../userReducer/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  // settings: settingsReducer,
  // add other reducers here
});

export default rootReducer;
