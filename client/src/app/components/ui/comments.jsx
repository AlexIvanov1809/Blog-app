import React, { useEffect } from "react";
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
import { getCurrentUserId } from "../../store/users";
import { loadPostsList } from "../../store/posts";

const Comments = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(postId));
  }, [postId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  const currentUserId = useSelector(getCurrentUserId());

  const handleSubmit = async (data) => {
    const comment = {
      ...data,
      postId,
      createdAt: Date.now(),
      userId: currentUserId
    };
    await dispatch(createComment(comment));
    dispatch(loadPostsList());
  };
  const handleRemoveComment = async (id) => {
    await dispatch(removeComment(id));
    dispatch(loadCommentsList(postId));
    dispatch(loadPostsList());
  };
  const sortedComments = orderBy(comments, ["createdAt"], ["desc"]);
  return (
    <>
      <AddComment onSubmit={handleSubmit} />
      {!isLoading ? (
        <CommentsList
          comments={sortedComments}
          onRemove={handleRemoveComment}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Comments;
