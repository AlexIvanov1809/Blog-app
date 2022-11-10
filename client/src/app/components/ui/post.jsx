import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../utils/displayDate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, getUsersIsLoggeedIn } from "../../store/users";
import { editLike } from "../../store/likes";

const Post = ({ post, like }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = displayDate(post.createdAt);
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const currentUserId = useSelector(getCurrentUserId());

  let likes;
  const handleClick = () => {
    if (!likes) {
      navigate(`/posts/${post._id}`);
    } else {
      likes = false;
    }
  };

  const handleChange = () => {
    likes = true;
    if (isLoggedIn) {
      dispatch(editLike(like._id, { userId: currentUserId }));
    }
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
            >
              <i
                className={`bi bi-hand-thumbs-up${
                  like.userId.findIndex((u) => u === currentUserId) === -1
                    ? ""
                    : "-fill"
                }`}
              ></i>{" "}
              {like.userId.length}
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
  post: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired
};
export default Post;
