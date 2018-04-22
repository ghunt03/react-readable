import React, { Component } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { postPost, updatePost } from "../actions/Posts";
import { capitalize } from "../utils/helpers";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      id: "",
      timestamp: Date.now(),
      title: "",
      body: "",
      author: "",
      category: "",
      commentCount: 0,
      voteScore: 1,
      isEditing: false
    };
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
        commentCount: post.commentCount,
        voteScore: post.voteScore,
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
        commentCount: 0,
        voteScore: 1,
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
      category: this.state.category,
      commentCount: this.state.commentCount,
      voteScore: this.state.voteScore
    };
    if (this.state.isEditing) {
      this.props.editPost(post);
    } else {
      this.props.addPost(post);
    }
    this.props.onToggleModal();
  };

  render() {
    const { modalIsOpen, onToggleModal, categories } = this.props;
    return (
      <Modal isOpen={modalIsOpen} toggle={onToggleModal}>
        <ModalHeader toggle={onToggleModal}>Publish Post</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Post Title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                type="text"
                name="author"
                id="author"
                placeholder="Your Name"
                value={this.state.author}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="body">Content</Label>
              <Input
                type="textarea"
                name="body"
                id="body"
                placeholder="Write your post"
                value={this.state.body}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                defaultValue={this.state.category}
                onChange={this.handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {capitalize(category.name)}
                  </option>
                ))}
              </Input>
            </FormGroup>
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
  return { post: state.posts[postId], categories: state.categories.categories };
};

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(postPost(data)),
  editPost: data => dispatch(updatePost(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
