import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequsetFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceved,
  commentsRequsetFiled,
  commentCreated,
  commentRemoved
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequsetFiled(error.message));
  }
};
export const createComment = (payload) => async (dispatch) => {
  dispatch(addCommentRequested());
  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsRequsetFiled(error.message));
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) {
      dispatch(commentRemoved(commentId));
    }
  } catch (error) {
    dispatch(commentsRequsetFiled(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
