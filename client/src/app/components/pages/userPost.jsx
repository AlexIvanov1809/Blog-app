import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editLike, getlikesByPostId } from "../../store/likes";
import { getPostsById, getPostsLoadingStatus } from "../../store/posts";
import {
  getCurrentUserId,
  getUsersByIds,
  getUsersIsLoggeedIn
} from "../../store/users";
import { displayDate } from "../../utils/displayDate";
import BackButton from "../common/backButton";
import Comments from "../ui/comments";

const UserPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(getPostsById(postId))[0];
  const likes = useSelector(getlikesByPostId(postId))[0];
  const currentUserId = useSelector(getCurrentUserId());
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const isLoading = useSelector(getPostsLoadingStatus());
  const postMaker = useSelector(getUsersByIds(post?.userId));

  const [date, setDate] = useState();
  useEffect(() => {
    if (!isLoading) {
      setDate(displayDate(post?.createdAt));
    }
  }, [isLoading]);

  const handleChange = () => {
    if (isLoggedIn) {
      dispatch(editLike(likes._id, { userId: currentUserId }));
    }
  };
  return (
    <div className="container">
      <BackButton to={"/"} />
      {post && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between ">
              <h4 className="card-title">{post.title}</h4>
              <div className="text-center ms-2">
                <img
                  src={postMaker.image}
                  alt=""
                  className="img-responsive rounded-circle"
                  width="50"
                  height="50"
                />
                <div style={{ fontSize: "12px" }}>{postMaker.name}</div>
              </div>
            </div>
            <hr />
            <p className="card-text mb-2" style={{ textAlign: "justify" }}>
              {post.fullText}
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <span
                  className="text-muted me-2 like"
                  role="button"
                  onClick={handleChange}
                >
                  <i
                    className={`bi bi-hand-thumbs-up${
                      likes.userId.findIndex((u) => u === currentUserId) === -1
                        ? ""
                        : "-fill"
                    }`}
                  ></i>{" "}
                  {likes.userId.length}
                </span>
              </div>
              <div className="text-end text-muted">
                <span
                  className="text-end text-muted"
                  style={{ fontSize: "11px" }}
                >
                  {date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Comments />
    </div>
  );
};

export default UserPost;
