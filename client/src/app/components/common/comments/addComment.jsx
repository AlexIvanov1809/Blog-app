import React, { useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";

const AddComment = ({ onSubmit }) => {
  const [data, setData] = useState({ content: "" });
  const [errors, setErrors] = useState({});
  const currentUserId = useSelector(getCurrentUserId());
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({ content: "" });
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    data.userId = currentUserId;
    onSubmit(data);
    clearForm();
  };

  return (
    <div className="card mb-2 mt-2">
      <div className="card-body">
        <h2>New comment</h2>
        <form onSubmit={handleSubmit}>
          <TextAreaField
            value={data.content || ""}
            onChange={handleChange}
            name="content"
            label="Сообщение"
            error={errors.content}
          />
          <div className="pt-2 w-100 text-end">
            <button className="btn btn-primary" style={{ width: "160px" }}>
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
AddComment.propTypes = {
  onSubmit: PropTypes.func
};
export default AddComment;
