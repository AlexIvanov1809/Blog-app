import { createAction, createSlice } from "@reduxjs/toolkit";
import postService from "../services/post.service";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    postsRequested: (state) => {
      state.isLoading = true;
    },
    postsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    postsRequsetFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    postUpdated: (state, action) => {
      const editedPostIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[editedPostIndex] = action.payload;
    },
    postCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    postRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { reducer: postsReducer, actions } = postsSlice;
const {
  postsRequested,
  postsReceved,
  postsRequsetFiled,
  postCreated,
  postUpdated,
  postRemoved
} = actions;

const addpostRequested = createAction("posts/addpostRequested");
const postUpdateRequasted = createAction("posts/postUpdateRequasted");
const postUpdateFaild = createAction("posts/postUpdateFaild");

export const loadPostsList = () => async (dispatch) => {
  dispatch(postsRequested());
  try {
    const { content } = await postService.getPosts();
    dispatch(postsReceved(content));
  } catch (error) {
    dispatch(postsRequsetFiled(error.message));
  }
};
export const createPost = (payload, navigate) => async (dispatch) => {
  dispatch(addpostRequested());
  try {
    const { content } = await postService.createPost(payload);
    dispatch(postCreated(content));
    navigate();
  } catch (error) {
    dispatch(postsRequsetFiled(error.message));
  }
};

export const editPost = (payload, navigate) => async (dispatch) => {
  dispatch(postUpdateRequasted());
  try {
    const { content } = await postService.editPost(payload._id, payload);
    dispatch(postUpdated(content));
    navigate();
  } catch (error) {
    dispatch(postUpdateFaild(error.message));
  }
};

export const removePost = (postId) => async (dispatch) => {
  try {
    const { content } = await postService.removePost(postId);
    if (content === null) {
      dispatch(postRemoved(postId));
    }
  } catch (error) {
    dispatch(postsRequsetFiled(error.message));
  }
};

export const getCurrentPostData = (postId) => (state) => {
  return state.posts.entities
    ? state.posts.entities.find((p) => p._id === postId)
    : null;
};

export const getPosts = () => (state) => state.posts.entities;
export const getPostsByUserId = (userId) => (state) => {
  return state.posts.entities
    ? state.posts.entities.filter((p) => p.userId === userId)
    : [];
};
export const getPostsById = (postId) => (state) => {
  return state.posts.entities
    ? state.posts.entities.filter((p) => p._id === postId)
    : [];
};

export const getPostsLoadingStatus = () => (state) => state.posts.isLoading;

export default postsReducer;
