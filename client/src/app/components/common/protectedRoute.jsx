import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsersIsLoggeedIn } from "../../store/users";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
      )}
    </>
  );
};

export default ProtectedRoutes;
