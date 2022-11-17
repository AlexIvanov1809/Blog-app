import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { loadLikesList } from "../../store/likes";
import { createPost } from "../../store/posts";
import { getCurrentUserId } from "../../store/users";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import BackButton from "../common/backButton";

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
  const [errors, setErrors] = useState();
  const [showErr, setShowErr] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    title: {
      isRequired: { message: "Title is important for feel" }
    },
    shortText: {
      isRequired: { message: "Short text is important for feel" }
    },
    fullText: {
      isRequired: { message: "Full text is important for feel" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const back = () => {
    navigate(`/users/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return setShowErr(errors);
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
      <BackButton />
      <div className="card p-3">
        <label className="fw-bold mb-4">Новый пост</label>
        <form onSubmit={handleSubmit}>
          <div className="w-50">
            <TextField
              label="Заголовок"
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              maxLength={60}
              error={showErr.title}
            />
          </div>
          <div className="w-75">
            <TextAreaField
              label="Описание"
              name="shortText"
              value={data.shortText}
              onChange={handleChange}
              maxLength={150}
              error={showErr.shortText}
            />
          </div>
          <TextAreaField
            label="Полный текст"
            name="fullText"
            value={data.fullText}
            onChange={handleChange}
            rows="5"
            error={showErr.fullText}
          />
          <div className="text-end">
            <button className="btn btn-primary" type="submit">
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
