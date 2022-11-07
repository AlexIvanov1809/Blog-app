import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getCurrentPostData } from "../../store/posts";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPost = useSelector(getCurrentPostData(postId));
  console.log(currentPost);
  const [data, setData] = useState(currentPost);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const back = () => {
    navigate("/adminPage");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost(data, back));
  };
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
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
