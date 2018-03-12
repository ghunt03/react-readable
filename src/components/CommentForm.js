import React, { Component } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { postComment, updateComment } from "../actions";

import {
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class CommentForm extends Component {
  state = {
    id: "",
    parentId: "",
    author: "",
    body: "",
    timestamp: Date.now(),
    isEditing: false
  };
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps({ comment, parentId }) {
    if (comment) {
      this.setState({
        id: comment.id,
        parentId: comment.parentId,
        author: comment.author,
        body: comment.body,
        timestamp: comment.timestamp,
        isEditing: true
      });
    } else {
      this.setState({
        id: uuid(),
        parentId: parentId,
        author: "",
        body: "",
        timestamp: Date.now(),
        isEditing: false
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  publishComment = e => {
    const comment = {
      id: this.state.id,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.state.parentId
    };
    if (this.state.isEditing) {
        this.props.editComment(comment);
    } else {
        this.props.addComment(comment);
    }

    
    this.props.onToggleModal();
  };

  render() {
    const { modalIsOpen, onToggleModal } = this.props;
    return (
      <Modal isOpen={modalIsOpen} toggle={onToggleModal}>
        <ModalHeader toggle={onToggleModal}>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <Input
              type="text"
              name="author"
              id="exampleText"
              placeholder="Your Name"
              value={this.state.author}
              onChange={this.handleInputChange}
            />
            <Input
              type="textarea"
              name="body"
              id="exampleText"
              placeholder="Write a response"
              value={this.state.body}
              onChange={this.handleInputChange}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.publishComment}>
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
  const { commentId } = ownProps;
  return { comment: state.comments[commentId] };
};

const mapDispatchToProps = dispatch => ({
  addComment: data => dispatch(postComment(data)),
  editComment: data => dispatch(updateComment(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
