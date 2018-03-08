import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllPosts, postVote } from "../actions";
import FaThumbsOUp from "react-icons/lib/fa/thumbs-o-up";
import FaThumbsODown from "react-icons/lib/fa/thumbs-o-down";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
class Posts extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }

  updateVote = ({ id, option, type }) => {
    this.props.vote({ id: id, option: option, type: type });
  };

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
                  <h4>{post.title}</h4>
                </Col>
              </Row>
              <Row>
                <Col xs="3">by {post.author}</Col>
                <Col xs="3">Comments: {post.commentCount}</Col>
                <Col xs="3">
                  Vote Score: {post.voteScore}
                  <Button
                    color="link"
                    onClick={() =>
                      this.updateVote({
                        id: post.id,
                        option: "upVote",
                        type: "post"
                      })
                    }
                  >
                    <FaThumbsOUp />
                  </Button>
                  <Button
                    color="link"
                    onClick={() =>
                      this.updateVote({
                        id: post.id,
                        option: "downVote",
                        type: "post"
                      })
                    }
                  >
                    <FaThumbsODown />
                  </Button>
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
  const { posts } = state;
  return { posts: Object.values(posts) };
};

const mapDispatchToProps = dispatch => ({
  getAllPosts: data => dispatch(fetchAllPosts()),
  vote: data => dispatch(postVote(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
