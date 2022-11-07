import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import commentsReducer from "./comments";
import postsReducer from "./posts";

const rootReducer = combineReducers({
  users: usersReducer,
  comments: commentsReducer,
  posts: postsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
