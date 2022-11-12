import React, { useState } from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  maxLength,
  error,
  rows = "3"
}) => {
  const [textLength, setTextLength] = useState(value);
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
    setTextLength(target.value);
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}> {label}</label>
      <div className="input-group has-validation">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          maxLength={maxLength}
          rows={rows}
        />

        {error && <div className="invalid-feedback ">{error}</div>}
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
TextAreaField.defaultProps = {
  type: "text"
};
TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  rows: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextAreaField;
