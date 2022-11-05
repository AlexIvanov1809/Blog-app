import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuthError, signIn } from "../../store/users";
// import * as yup from "yup";

const LoginForm = () => {
  // const location = useLocation();
  // const redirect = location.state?.from || "/";
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  // const dispatch = useDispatch();
  // const loginError = useSelector(getAuthError());

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required("Password is important for feel")
  //     .matches(/^(?=.*[A-Z])/, "Have no capital letter")
  //     .matches(/(?=.*[0-9])/, "Have no digit")
  //     .matches(/(?=.*[!@#$%^&*])/, "have no secial symbol !@#$%^&*")
  //     .matches(/(?=.{8,})/, "Passwort contains min 8 symbols"),
  //   email: yup
  //     .string()
  //     .required("E-mail is important for feel")
  //     .email("E-mail uncorrect")
  // });

  const validatorConfig = {
    email: {
      isRequired: { message: "E-mail is important for feel" }
    },
    password: {
      isRequired: { message: "Password is important for feel" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return console.log(data);
    // dispatch(signIn({ payload: data, redirect }));
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
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Stay in system
      </CheckBoxField>
      {/* {loginError && <p className="text-danger">{loginError}</p>} */}
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        submit
      </button>
    </form>
  );
};

export default LoginForm;
