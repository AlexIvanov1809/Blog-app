import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/common/backButton";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import { removeAuthError } from "../store/users";

const Login = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const refreshErrors = () => {
    dispatch(removeAuthError());
  };
  const toggleFormeType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
    refreshErrors();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column  align-items-center">
        <div className="w-100 ps-4">
          <BackButton to={"/"} />
        </div>
        <div className="shadow p-4 bg-white" style={{ maxWidth: "400px" }}>
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
              <p>
                Уже есть аккаунт?{" "}
                <Link role="button" to="/login" onClick={toggleFormeType}>
                  Войти
                </Link>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Вход</h3>
              <LoginForm />
              <p>
                {"Нет аккаунта?"}{" "}
                <Link role="button" to="/register" onClick={toggleFormeType}>
                  Регистрация
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
