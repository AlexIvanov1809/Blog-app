import { createAction, createSlice } from "@reduxjs/toolkit";
import likeService from "../services/like.service";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    likesRequested: (state) => {
      state.isLoading = true;
    },
    likesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    likesRequsetFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    likeUpdated: (state, action) => {
      const editedLikeIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[editedLikeIndex] = action.payload;
    }
  }
});

const { reducer: likesReducer, actions } = likesSlice;
const { likesRequested, likesReceved, likesRequsetFiled, likeUpdated } =
  actions;

const likeUpdateRequasted = createAction("likes/likeUpdateRequasted");
const likeUpdateFaild = createAction("likes/likeUpdateFaild");

export const loadLikesList = () => async (dispatch) => {
  dispatch(likesRequested());
  try {
    const { content } = await likeService.getLikes();
    dispatch(likesReceved(content));
  } catch (error) {
    dispatch(likesRequsetFiled(error.message));
  }
};

export const editLike = (likeId, payload) => async (dispatch) => {
  dispatch(likeUpdateRequasted());
  try {
    const { content } = await likeService.editLike(likeId, payload);
    dispatch(likeUpdated(content));
  } catch (error) {
    dispatch(likeUpdateFaild(error.message));
  }
};

export const getlikes = () => (state) => state.likes.entities;
export const getlikesByPostId = (postId) => (state) => {
  return state.likes.entities
    ? state.likes.entities.filter((p) => p.postId === postId)
    : [];
};

export const getlikesLoadingStatus = () => (state) => state.likes.isLoading;

export default likesReducer;
