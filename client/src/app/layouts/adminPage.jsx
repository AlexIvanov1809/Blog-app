import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminPostItem from "../components/ui/adminPostItem";
import { getPosts } from "../store/posts";

const AdminPage = () => {
  const loadPosts = useSelector(getPosts());
  const [posts, setPosts] = useState();

  useEffect(() => {
    setPosts(loadPosts);
  }, [loadPosts]);
  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between">
        <div>
          <h3>Posts</h3>
        </div>
        <div className="text-end">
          <Link className="btn btn-primary" to={"/adminPage/newPost"}>
            Create post
          </Link>
        </div>
      </div>
      <div className="card d-flex flex-wrap w-100">
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
