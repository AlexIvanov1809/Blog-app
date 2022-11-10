import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../components/ui/post";
import { getlikes } from "../store/likes";
import { getPosts } from "../store/posts";

const Main = () => {
  const loadPosts = useSelector(getPosts());
  const loadLikes = useSelector(getlikes());
  const [posts, setPosts] = useState();
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    setPosts(loadPosts);
    setLikes(loadLikes);
  }, [loadPosts, loadLikes]);
  return (
    <div className="container">
      <div className="d-flex flex-wrap">
        {posts &&
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              like={likes.filter((l) => post._id === l.postId)[0]}
            />
          ))}
      </div>
    </div>
  );
};

export default Main;
