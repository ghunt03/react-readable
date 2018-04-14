import React, { Component } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { postPost, updatePost} from "../actions";

import {
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class PostForm extends Component {
  state = {
    id: "",
    timestamp: Date.now(),
    title: "",
    body: "",
    author: "",
    category: "",
    isEditing: false
  };
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  componentWillReceiveProps({ post }) {
    if (post) {
      this.setState({
        id: post.id,
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        isEditing: true
      });
    } else {
      this.setState({
        id: uuid(),
        timestamp: Date.now(),
        title: "",
        body: "",
        author: "",
        category: "",
        isEditing: false
      });
    }
  }

  publish = e => {
    const post = {
      id: this.state.id,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    };
    if (this.state.isEditing) {
      this.props.updatePost(post);
    } else {
      this.props.addPost(post);
    }
  };

  render() {
    const { modalIsOpen, onToggleModal } = this.props;
    return (
      <Modal isOpen={modalIsOpen} toggle={onToggleModal}>
        <ModalHeader toggle={onToggleModal}>Publish Post</ModalHeader>
        <ModalBody>
          <Form>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Post Title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <Input
              type="text"
              name="author"
              id="author"
              placeholder="Your Name"
              value={this.state.author}
              onChange={this.handleInputChange}
            />
            <Input
              type="textarea"
              name="body"
              id="body"
              placeholder="Write your post"
              value={this.state.body}
              onChange={this.handleInputChange}
            />
            <Input type="select" name="category" id="category" defaultValue={this.state.body} onChange={this.handleInputChange}>
              <option value="udacity">Udacity</option>
              <option value="redux">Redux</option>
            </Input>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.publish}>
            Publish
          </Button>
          <Button color="secondary" onClick={onToggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  return { post: state.posts[postId], categories: state.categories};
}

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(postPost(data)),
  editPost: data => dispatch(updatePost(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
