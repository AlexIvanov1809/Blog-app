import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../utils/displayDate";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const date = displayDate(post.createdAt);
  let like;
  const handleClick = () => {
    if (!like) {
      navigate(`/posts/${post._id}`);
    } else {
      like = false;
    }
  };

  const handleChange = () => {
    like = true;
  };
  return (
    <div
      className="card m-2 text-decoration-none text-black"
      style={{ width: "320px" }}
      role="button"
      onClick={handleClick}
    >
      <div className="card-body">
        <h4 className="card-title">{post.title}</h4>
        <p className="card-text mb-2 ">{post.shortText}</p>
        <div className="d-flex justify-content-between">
          <div>
            <span
              className="text-muted me-2 like"
              role="button"
              onClick={handleChange}
              style={{ zIndex: "9999" }}
            >
              <i className="bi bi-hand-thumbs-up"></i> {post.likes}
            </span>
            <span className="text-muted">Comments: {post.comments.length}</span>
          </div>
          <div className="text-end text-muted">
            <span className="text-end text-muted" style={{ fontSize: "11px" }}>
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};
export default Post;
