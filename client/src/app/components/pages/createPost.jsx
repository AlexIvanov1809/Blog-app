import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../store/posts";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    shortText: "",
    fullText: ""
  });

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const back = () => {
    navigate("/adminPage");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data.createdAt = Date.now();
    dispatch(createPost(data, back));
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
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
