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
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState();
  const pageSize = 4;

  useEffect(() => {
    setPosts(loadPosts || []);
    setLikes(loadLikes);
  }, [loadPosts, loadLikes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  function searchPost(data) {
    const searchedPosts = searchQuery
      ? data.filter(
          (post) =>
            post.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : data;
    return searchedPosts;
  }
  const searchedPosts = searchPost(posts);
  const sortedPostsByNewest =
    searchedPosts?.length > 0 ? [...searchedPosts].reverse() : searchedPosts;
  const postCrop = paginate(sortedPostsByNewest, currentPage, pageSize);
  return (
    <div className="wrapper">
      {posts && likes ? (
        <div className="__container">
          <div className="mt-2">
            <input
              className="form-control m-auto"
              style={{ width: "300px" }}
              type="text"
              name="searchQuery"
              placeholder="Search..."
              onChange={handleSearchQuery}
              value={searchQuery}
            />
          </div>
          <hr />
          <div className="grid-container">
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
              itemsCount={searchedPosts.length}
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
    </div>
  );
};

export default Main;
