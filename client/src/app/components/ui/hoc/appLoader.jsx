import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsersIsLoggeedIn,
  getUsersLoadingStatus,
  loadUsersList
} from "../../../store/users";
import PropTypes from "prop-types";
import { loadPostsList } from "../../../store/posts";
import { loadLikesList } from "../../../store/likes";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());

  useEffect(() => {
    dispatch(loadLikesList());
    dispatch(loadPostsList());
    dispatch(loadUsersList());
  }, [isLoggedIn]);

  if (usersStatusLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
