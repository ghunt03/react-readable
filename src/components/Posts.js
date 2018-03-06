import React, { Component } from "react";

class Posts extends Component {
  
  componentDidMount() {
    const selectedCategory =
      "category" in this.props.match.params
        ? this.props.match.params.category
        : "all";
    console.log(selectedCategory);
  }

  render() {
    console.log(this.props);
    return <div>Posts</div>;
  }
}

export default Posts;
