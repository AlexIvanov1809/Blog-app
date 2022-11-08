import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onRemove }) => {
  return (
    <>
      {comments.length > 0 ? (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {comments.map((comment) => (
              <Comment key={comment._id} {...comment} onRemove={onRemove} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func
};

export default CommentsList;
