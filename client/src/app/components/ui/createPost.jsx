import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { loadLikesList } from "../../store/likes";
import { createPost } from "../../store/posts";
import { getCurrentUserId } from "../../store/users";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";

const CreatePost = () => {
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    shortText: "",
    fullText: "",
    comments: []
  });

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const back = () => {
    navigate(`/users/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.userId = userId;
    data.createdAt = Date.now();
    await dispatch(createPost(data, back));
    dispatch(loadLikesList());
  };
  if (userId !== currentUserId) {
    return <Navigate to={`/users/${currentUserId}/newPost`} />;
  }
  return (
    <div className="container mt-3">
      <div className="card p-3">
        <label className="fw-bold mb-4">New Post</label>
        <form onSubmit={handleSubmit}>
          <div className="w-50">
            <TextField
              label="Title"
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
          </div>
          <div className="w-75">
            <TextAreaField
              label="Short text"
              name="shortText"
              value={data.shortText}
              onChange={handleChange}
            />
          </div>
          <TextAreaField
            label="full text"
            name="fullText"
            value={data.fullText}
            onChange={handleChange}
            rows="5"
          />
          <div className="text-end">
            <button className="btn btn-primary" type="submit">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
