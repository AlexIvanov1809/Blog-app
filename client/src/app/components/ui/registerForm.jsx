import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, signUp } from "../../store/users";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    license: false
  });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthError());

  useEffect(() => {
    setErrors((prevState) => ({ ...prevState, email: loginError?.message }));
  }, [loginError]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Поле обязательно для заполнения" },
      isEmail: { message: "Неверный e-mail" }
    },
    name: {
      isRequired: { message: "Поле обязательно для заполнения" },
      min: { message: "Имя должно содержать минимум 3 символа", value: 3 }
    },
    password: {
      isRequired: { message: "Поле обязательно для заполнения" },
      isCapitalSymbol: {
        message: "Должна присутствовать одна заглавная буква"
      },
      isContainDigit: { message: "Должна присутствовать одна цифра" },
      min: { message: "Пароль должен содержать минимум 8 символов", value: 8 }
    },
    license: {
      isRequired: {
        message: "Ваше согласие обязательно"
      }
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
    navigate("/");
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    data.email = data.email.toLowerCase();
    dispatch(signUp(data, back));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Подтверждение на обработку персональных данных
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
