import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  editUser,
  getCurrentUserData,
  getCurrentUserId
} from "../../store/users";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";

const EditUserPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getCurrentUserData());
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    setData(user);
  }, [user]);

  const validatorConfig = {
    email: {
      isRequired: { message: "E-mail is important for feel" },
      isEmail: { message: "E-mail uncorrect" }
    },
    name: {
      isRequired: { message: "Name is important for feel" },
      min: { message: "Name contains min 3 symbols", value: 3 }
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
    navigate(`/users/${currentUserId}`);
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(data, back));
  };
  if (userId !== currentUserId) {
    return <Navigate to={`/users/${currentUserId}/edit`} />;
  }
  return (
    <div className="container">
      <div className="card p-2 m-auto mt-4" style={{ width: "320px" }}>
        <h4>Edit User</h4>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Электронная почта"
            name="email"
            value={data?.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label="Имя"
            name="name"
            value={data?.name}
            onChange={handleChange}
            error={errors.name}
          />
          <button
            className="btn btn-primary w-100 mx-auto"
            type="submit"
            disabled={!isValid}
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;
