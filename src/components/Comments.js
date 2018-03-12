import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchComments, deleteComment } from "../actions";
import Voter from "./Voter";
import Author from "./Author";
import CommentForm from "./CommentForm";
import { FaEdit, FaPlus, FaClose } from "react-icons/lib/fa";
import { ListGroup, ListGroupItem, Button, ButtonGroup } from "reactstrap";

class Comments extends Component {
  state = {
    commentModal: false,
    commentId: "0"
  };

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      commentModal: !this.state.commentModal,
      commentId: "0"
    });
  }

  componentWillMount() {
    const { id } = this.props;
    this.props.getComments(id);
  }

  editComment = id => {
    this.setState({
      commentId: id,
      commentModal: true
    });
  };

  deleteComment = id => {
    this.props.removeComment(id);
  };

  render() {
    const { comments, id } = this.props;
    return (
      <div>
        <CommentForm
          modalIsOpen={this.state.commentModal}
          parentId={id}
          commentId={this.state.commentId}
          onToggleModal={this.toggleModal}
        />
        <div className="nav">
          <h5>Comments ({comments.length})</h5>
          <Button color="link" onClick={this.toggleModal}>
            <FaPlus /> Add Comment
          </Button>
        </div>
        <ListGroup>
          {comments.map(comment => (
            <ListGroupItem key={comment.id}>
              <div className="comment-banner">
                <Author author={comment.author} />
                <div>
                  <ButtonGroup>
                    <Button
                      color="link"
                      onClick={() => this.editComment(comment.id)}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      color="link"
                      onClick={() => this.deleteComment(comment.id)}
                    >
                      <FaClose /> Remove
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              {comment.body}
              <Voter score={comment.voteScore} id={comment.id} type="comment" />
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { comments: Object.values(state.comments) };
};

const mapDispatchToProps = dispatch => ({
  getComments: data => dispatch(fetchComments(data)),
  removeComment: id => dispatch(deleteComment(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
