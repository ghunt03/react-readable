import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllPosts } from "../actions";
import Voter from "./Voter";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col
} from "reactstrap";
class Posts extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }

  render() {
    const { posts } = this.props;

    const filteredPosts =
      "category" in this.props.match.params
        ? posts.filter(
            post => post.category === this.props.match.params.category
          )
        : posts;
    return (
      <ListGroup>
        {filteredPosts.map(post => (
          <ListGroupItem key={post.id}>
            <Container>
              <Row>
                <Col>
                  <h4>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col xs="3">by {post.author}</Col>
                <Col xs="3">Comments: {post.commentCount}</Col>
                <Col xs="3">
                  <Voter score={post.voteScore} id={post.id} type="post"/>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { posts: Object.values(state.posts) };
};

const mapDispatchToProps = dispatch => ({
  getAllPosts: data => dispatch(fetchAllPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
