import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageSevice from "../services/localStorage.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageSevice.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageSevice.getUserID() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFeiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userUpdateSuccssed: (state, action) => {
      const editedUserIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[editedUserIndex] = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFeiled,
  authRequestSuccess,
  authRequestFailed,
  userUpdateSuccssed,
  userLoggedOut
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateFaild = createAction("users/userUpdateFaild");
const userUpdateRequasted = createAction("users/userUpdateRequasted");

export const signIn = (payload, navigate, redirect) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    dispatch(authRequestSuccess({ userId: data.userId }));
    localStorageSevice.setTokens(data);
    navigate(redirect);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp = (payload, navigate) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageSevice.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    navigate();
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = (navigate) => (dispatch) => {
  localStorageSevice.removeAuthData();
  dispatch(userLoggedOut());
  navigate();
};

export const editUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequasted());
  try {
    const { content } = await userService.edit(payload);
    dispatch(userUpdateSuccssed(content));
  } catch (error) {
    dispatch(userUpdateFaild(error.message));
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFeiled(error.message));
  }
};

export const getUsersByIds = (usersIds) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((q) => q._id === usersIds);
  }
  return [];
};

export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export const getUsersIsLoggeedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth?.userId;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
