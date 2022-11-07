import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsersIsLoggeedIn,
  getUsersLoadingStatus,
  loadUsersList
} from "../../../store/users";
import PropTypes from "prop-types";
import { loadPostsList } from "../../../store/posts";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadPostsList());
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, []);

  if (usersStatusLoading) return "Loading...";

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;