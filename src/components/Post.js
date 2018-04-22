import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button, ButtonGroup } from "reactstrap";

import { deletePost } from "../actions/Posts";

import Comments from "./Comments";
import { FaEdit, FaClose } from "react-icons/lib/fa";
import Voter from "./Voter";
import Author from "./Author";
import PostForm from "./PostForm";

class Post extends Component {
  
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      postModal: false,
      postId: "0"
    };
  }

  toggleModal() {
    this.setState({
      postModal: !this.state.postModal,
      postId: "0"
    });
  }

  editPost = id => {
    this.setState({
      postId: id,
      postModal: true
    });
  };

  deletePost = id => {
    this.props.remove(id);
    this.props.history.push('/');
  };

  render() {
    const { post } = this.props;
    if (post) {
      return (
        <div>
          <div>
            <PostForm
              modalIsOpen={this.state.postModal}
              postId={this.state.postId}
              onToggleModal={this.toggleModal}
            />
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
      return <Alert color="danger">Post not found</Alert>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return { post: state.posts[id] };
};

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(deletePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
