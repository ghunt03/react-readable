import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchComments, postComment } from "../actions";
import Voter from "./Voter";
import uuid from "uuid";
import {
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
class Comments extends Component {
  state = {
    author: "",
    body: ""
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

  componentWillMount() {
    const { id } = this.props;
    this.props.getComments(id);
  }

  publishComment = e => {
    console.log(this.state);

    const comment = {
      id: uuid(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.id
    };
    console.log(comment);
    this.props.addComment(comment);
  };

  render() {
    const { comments } = this.props;
    return (
      <div>
        <Form>
          <Container className="commentBox">
            <Row>
              <Col>
                <Input
                  type="text"
                  name="author"
                  id="exampleText"
                  placeholder="Your Name"
                  value={this.state.author}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  type="textarea"
                  name="body"
                  id="exampleText"
                  placeholder="Write a response"
                  value={this.state.body}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={this.publishComment}>Publish</Button>
              </Col>
            </Row>
          </Container>
        </Form>
        <br />
        <ListGroup>
          {comments.map(comment => (
            <ListGroupItem key={comment.id}>{comment.body}</ListGroupItem>
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
  addComment: data => dispatch(postComment(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
