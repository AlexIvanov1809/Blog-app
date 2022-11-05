import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsersIsLoggeedIn,
  getUsersLoadingStatus,
  loadUsersList
} from "../../../store/users";
import PropTypes from "prop-types";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

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
