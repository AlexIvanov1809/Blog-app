import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../utils/displayDate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserId,
  getUsersByIds,
  getUsersIsLoggeedIn
} from "../../store/users";
import { editLike } from "../../store/likes";

const Post = ({ post, like }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = displayDate(post.createdAt);
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const currentUserId = useSelector(getCurrentUserId());
  const postMaker = useSelector(getUsersByIds(post.userId));
  const name = postMaker.name.split(" ")[0];

  const handleClick = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      dispatch(editLike(like._id, { userId: currentUserId }));
    }
  };
  return (
    <div
      className="card m-2 grid-item text-decoration-none text-black"
      role="button"
      onClick={handleClick}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between">
            <h4 className="card-title">{post.title}</h4>
            <div className="text-center ms-2">
              <img
                src={postMaker.image}
                alt=""
                className="img-responsive rounded-circle"
                width="30"
                height="30"
              />
              <div style={{ fontSize: "12px" }}>{name}</div>
            </div>
          </div>
          <p className="card-text mb-2 ">{post.shortText}</p>
        </div>
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
            <span className="text-muted ms-2">
              <i className="bi bi-chat-left-text"></i> {post.comments.length}
            </span>
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
