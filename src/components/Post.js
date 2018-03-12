import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button, ButtonGroup } from "reactstrap";
import Comments from "./Comments";
import { FaEdit, FaClose } from "react-icons/lib/fa";
import Voter from "./Voter";
import Author from "./Author";

class Post extends Component {
  editPost = id => {
    // this.setState({
    //   commentId: id,
    //   commentModal: true
    // });
  };

  deletePost = id => {
    //this.props.removeComment(id);
  };

  render() {
    const { post } = this.props;
    if (post) {
      return (
        <div>
          <div>
            <h3>{post.title}</h3>
            <div className="post-banner">
              <Author author={post.author} />
              <Voter score={post.voteScore} id={post.id} type="post" />
              <ButtonGroup>
                <Button color="link" onClick={() => this.editPost(post.id)}>
                  <FaEdit /> Edit
                </Button>
                <Button color="link" onClick={() => this.deletePost(post.id)}>
                  <FaClose /> Remove
                </Button>
              </ButtonGroup>
            </div>

            <p>{post.body}</p>
          </div>
          <Comments id={post.id} />
        </div>
      );
    } else {
      return <Alert color="danger">Invalid Post ID</Alert>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return { post: state.posts[id] };
};

export default connect(mapStateToProps)(Post);
