import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AdminPostItem from "../ui/adminPostItem";
import { getPosts, getPostsByUserId } from "../../store/posts";
import UserBio from "../ui/userBio";
import { getCurrentUserData } from "../../store/users";
import BackButton from "../common/backButton";

const AdminPage = () => {
  const { userId } = useParams();
  const loadPosts = useSelector(getPosts());
  const userPosts = useSelector(getPostsByUserId(userId));
  const { _id, name, image } = useSelector(getCurrentUserData());
  const [posts, setPosts] = useState();
  useEffect(() => {
    setPosts(userPosts);
  }, [loadPosts]);
  return (
    <div className="container mt-3">
      <BackButton />
      <UserBio id={_id} name={name} image={image} />
      <div className="d-flex justify-content-between">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div>
            <h3>Posts</h3>
          </div>
          <div className="text-end">
            <Link
              className="btn btn-white fs-3"
              to={`/users/${userId}/newPost`}
            >
              <i className="bi bi-file-earmark-plus"></i>
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-wrap justify-content-center">
        {posts &&
          posts.map((item) => (
            <div
              className="card m-2 p-2"
              style={{ width: "300px" }}
              key={item._id}
            >
              <AdminPostItem post={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPage;
