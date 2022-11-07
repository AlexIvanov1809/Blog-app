import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getUsersIsLoggeedIn } from "../../store/users";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const currentUser = useSelector(getCurrentUserData());
  return (
    <>
      {isLoggedIn ? (
        currentUser.admin ? (
          <Outlet />
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
      )}
    </>
  );
};

export default ProtectedRoutes;
