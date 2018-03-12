import React, { Component } from "react";
import FaUser from "react-icons/lib/fa/user";
class Author extends Component {
  render() {
    return (
      <div>
        <FaUser size={20} /> {this.props.author}
      </div>
    );
  }
}

export default Author;
