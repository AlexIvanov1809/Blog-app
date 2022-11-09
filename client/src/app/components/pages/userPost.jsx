import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostsById, getPostsLoadingStatus } from "../../store/posts";
import { getUsersIsLoggeedIn } from "../../store/users";
import { displayDate } from "../../utils/displayDate";
import Comments from "../ui/comments";

const UserPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector(getPostsById(postId))[0];
  const isLoading = useSelector(getPostsLoadingStatus());
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const [date, setDate] = useState();
  console.log(post);
  useEffect(() => {
    if (!isLoading) {
      setDate(displayDate(post?.createdAt));
    }
  }, [isLoading]);

  const handleChange = () => {
    console.log("click");
  };
  return (
    <div className="container">
      {post && (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text mb-2 ">{post.fullText}</p>
            <div className="d-flex justify-content-between">
              <div>
                <span
                  className="text-muted me-2 like"
                  role="button"
                  onClick={handleChange}
                >
                  <i className="bi bi-hand-thumbs-up"></i> {post.likes}
                </span>
                <span className="text-muted">
                  Comments: {post?.comments?.length}
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
      <div className="text-end mt-2 mb-2">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      {isLoggedIn && <Comments />}
    </div>
  );
};

export default UserPost;
