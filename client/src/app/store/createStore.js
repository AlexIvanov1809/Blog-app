import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import commentsReducer from "./comments";
import postsReducer from "./posts";
import likesReducer from "./likes";

const rootReducer = combineReducers({
  users: usersReducer,
  comments: commentsReducer,
  posts: postsReducer,
  likes: likesReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
