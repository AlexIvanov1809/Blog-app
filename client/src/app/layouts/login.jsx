import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/common/backButton";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormeType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <BackButton to={"/"} />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4 bg-white">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have account?{" "}
                <Link role="button" to="/login" onClick={toggleFormeType}>
                  Sing In
                </Link>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                {"Don't have account?"}{" "}
                <Link role="button" to="/register" onClick={toggleFormeType}>
                  Sing Up
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
