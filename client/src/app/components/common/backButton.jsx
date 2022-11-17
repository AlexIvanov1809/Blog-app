import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BackButton = ({ to }) => {
  const navigate = useNavigate();
  return (
    <div className=" mt-2 mb-2">
      <button className="btn btn-primary" onClick={() => navigate(to)}>
        <i className="bi bi-caret-left-fill"></i> Назад
      </button>
    </div>
  );
};
BackButton.defaultProps = {
  to: -1
};
BackButton.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default BackButton;
