import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/ui/post";
import { getPosts } from "../store/posts";

const Main = () => {
  const loadPosts = useSelector(getPosts());
  return (
    <div className="container">
      <div className="d-flex flex-wrap">
        {loadPosts &&
          loadPosts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Main;
