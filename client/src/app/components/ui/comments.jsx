import React, { useEffect, useState } from "react";
import AddComment from "../common/comments/addComment";
import CommentsList from "../common/comments/commentsList";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getUsersIsLoggeedIn } from "../../store/users";
import { loadPostsList } from "../../store/posts";

const Comments = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  useEffect(() => {
    dispatch(loadCommentsList(postId));
  }, [postId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const downloadComments = useSelector(getComments());
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(downloadComments);
  }, [downloadComments]);
  const handleSubmit = async (data) => {
    const comment = {
      ...data,
      postId,
      createdAt: Date.now()
    };
    await dispatch(createComment(comment));
    dispatch(loadPostsList());
  };
  const handleRemoveComment = async (id) => {
    await dispatch(removeComment(id));
    setComments(comments.filter((c) => c._id !== id));
    dispatch(loadPostsList());
  };
  const sortedComments = orderBy(comments, ["createdAt"], ["desc"]);
  return (
    <>
      {isLoggedIn && <AddComment onSubmit={handleSubmit} />}
      {!isLoading ? (
        <CommentsList
          comments={sortedComments}
          onRemove={handleRemoveComment}
        />
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
