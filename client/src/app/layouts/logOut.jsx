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
  return <h1>Loading...</h1>;
};

export default LogOut;
