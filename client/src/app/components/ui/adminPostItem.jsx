import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadPostsList, removePost } from "../../store/posts";

const AdminPostItem = ({ post }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const handleClick = async (postId) => {
    await dispatch(removePost(postId));
    dispatch(loadPostsList());
  };
  return (
    <div className="d-flex justify-content-between">
      <h3>{post.title}</h3>
      <div>
        <Link
          className="btn btn-white"
          to={`/${userId}/adminPage/${post._id}/edit`}
        >
          edit
        </Link>
        <button className="btn btn-white" onClick={() => handleClick(post._id)}>
          delete
        </button>
      </div>
    </div>
  );
};

AdminPostItem.propTypes = {
  post: PropTypes.object.isRequired
};
export default AdminPostItem;
