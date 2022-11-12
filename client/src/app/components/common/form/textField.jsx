import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  maxLength
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [textLength, setTextLength] = useState(value);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
    setTextLength(target.value);
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const toggleShowPasswor = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={showPassword ? "text" : type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPasswor}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      {maxLength ? (
        <label style={{ fontSize: "12px" }}>
          {textLength.length}/{maxLength} максимальное количество символов
        </label>
      ) : (
        ""
      )}
    </div>
  );
};
TextField.defaultProps = {
  type: "text"
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func
};

export default TextField;
