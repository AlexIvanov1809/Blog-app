import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getCurrentUserId } from "../store/users";
import AdminPage from "../components/pages/adminPage";

const Posts = () => {
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <>
      {userId === currentUserId ? (
        <AdminPage />
      ) : (
        <Navigate to={`/users/${currentUserId}`} />
      )}
    </>
  );
};

export default Posts;
