import React, { Component } from "react";
import { connect } from "react-redux";
import Comments from "./Comments";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";
import Voter from "./Voter";

class Post extends Component {
  render() {
    const { post } = this.props;
    if (post) {
      return (
        <Container>
          <Row>
            <Col xs="10">
              <h3>{post.title}</h3>
            </Col>
            <Col xs="2">by {post.author}</Col>
          </Row>

          <Row>
            
            <Col>
              <Voter score={post.voteScore} id={post.id} type="post" />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{post.body}</p>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Comments ({post.commentCount})</h5>
              <Comments id={post.id} />
            </Col>
          </Row>
        </Container>
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
