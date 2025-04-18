import React from 'react';

const FormLoader = ({ message }) => {
  return (
    <div className="form-loading-overlay">0
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20"></circle>
      </svg>
      <div className="loading-text">{message}</div>
    </div>
  );
};

export default FormLoader;