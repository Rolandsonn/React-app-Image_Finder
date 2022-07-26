import React from "react";

const Button = ({ title, onClick }) => (
  <button className="loadMoreBtn" onClick={onClick}>
    {title}
  </button>
);

export default Button;
