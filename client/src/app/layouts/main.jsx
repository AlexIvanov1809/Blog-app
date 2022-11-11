import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../components/common/pagination";
import Post from "../components/ui/post";
import { getlikes } from "../store/likes";
import { getPosts } from "../store/posts";
import { paginate } from "../utils/paginate";

const Main = () => {
  const loadPosts = useSelector(getPosts());
  const loadLikes = useSelector(getlikes());
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState();
  useEffect(() => {
    setPosts(loadPosts);
    setLikes(loadLikes);
  }, [loadPosts, loadLikes]);

  const pageSize = 4;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const postCrop = paginate(posts, currentPage, pageSize);
  return (
    <>
      {posts && likes ? (
        <div className="container">
          <div className="d-flex flex-wrap align-items-start justify-content-center mt-2">
            {postCrop.map((post) => (
              <Post
                key={post._id}
                post={post}
                like={likes.filter((l) => post._id === l.postId)[0]}
              />
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={posts.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
