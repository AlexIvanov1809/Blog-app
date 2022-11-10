import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";
import { loadPostsList } from "../../../store/posts";
import { loadLikesList } from "../../../store/likes";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const usersStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadLikesList());
    dispatch(loadPostsList());
    dispatch(loadUsersList());
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
