import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/users";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const back = () => {
    navigate("/");
  };
  useEffect(() => {
    dispatch(logOut(back));
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};

export default LogOut;
