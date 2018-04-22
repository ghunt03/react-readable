import React from "react";
import FaUser from "react-icons/lib/fa/user";

const Author = ({ author }) => (
  <div>
    <FaUser size={20} /> {author}
  </div>
);

export default Author;
