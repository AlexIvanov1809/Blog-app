import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { editPost, getCurrentPostData } from "../../store/posts";
import { getCurrentUserId } from "../../store/users";
import BackButton from "../common/backButton";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

const EditPost = () => {
  const { postId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPost = useSelector(getCurrentPostData(postId));
  const currentUserId = useSelector(getCurrentUserId());
  const [data, setData] = useState();
  const [errors, setErrors] = useState();
  const [showErr, setShowErr] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  useEffect(() => {
    if (currentPost) {
      setData(currentPost);
    }
  }, []);
  const validatorConfig = {
    title: {
      isRequired: { message: "Поле обязательно для заполнения" }
    },
    shortText: {
      isRequired: { message: "Поле обязательно для заполнения" }
    },
    fullText: {
      isRequired: { message: "Поле обязательно для заполнения" }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return setShowErr(errors);
    dispatch(editPost(data, back));
  };
  if (currentPost && currentPost.userId !== currentUserId) {
    return <Navigate to={`/users/${currentUserId}`} />;
  }
  return (
    <div className="container mt-3">
      <BackButton to={`/users/${currentUserId}`} />
      <div className="card p-3">
        <label className="fw-bold mb-4">Редактирование поста</label>
        {data && (
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
            />
            <div className="text-end">
              <button className="btn btn-primary" type="submit">
                Изменить
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPost;
