import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllPosts } from "../actions";
import Voter from "./Voter";
import PostForm from "./PostForm";
import { ListGroup, ListGroupItem, Container, Row, Col, Button } from "reactstrap";
import { FaPlus } from "react-icons/lib/fa";
class Posts extends Component {
  state = {
    postModal: false,
    postId: "0"
  };

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    this.props.getAllPosts();
    
  }

  toggleModal() {
    this.setState({
      postModal: !this.state.postModal,
      postId: "0"
    });
  }

  openPostForm = () => {
    this.toggleModal()
  }

  render() {
    const { posts } = this.props;

    const filteredPosts =
      "category" in this.props.match.params
        ? posts.filter(
            post => post.category === this.props.match.params.category
          )
        : posts;
        console.log(posts);
    return (
      <div>
        <PostForm modalIsOpen={this.state.postModal}
          postId={this.state.postId}
          onToggleModal={this.toggleModal}/>
        <div className="clearfix">
          <Button color="link" className="float-right" onClick={this.openPostForm}>
            <FaPlus /> Add Post
          </Button>
        </div>

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
                    <Voter score={post.voteScore} id={post.id} type="post" />
                  </Col>
                </Row>
              </Container>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
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
