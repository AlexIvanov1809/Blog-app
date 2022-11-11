import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const UserBio = ({ id, name, image }) => {
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUserId === id && (
          <Link
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            to={`/users/${id}/edit`}
            state={{ userId: id }}
          >
            <i className="bi bi-gear"></i>
          </Link>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="175"
            height="175"
          />
          <div className="mt-3">
            <h4>{name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
UserBio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string
};
export default UserBio;
