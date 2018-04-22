import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllPosts } from "../actions/Posts";
import { compareValues } from "../utils/helpers";
import PostInfo from "./PostInfo";
import PostForm from "./PostForm";
import {
  Alert,
  ListGroup,
  Button,
  Input,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { FaPlus } from "react-icons/lib/fa";
class Posts extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

    this.state = {
      postModal: false,
      sortBy: "voteScore",
      sortOrder: "desc"
    };
  }

  componentDidMount() {
    this.props.getAllPosts();
  }

  toggleModal() {
    this.setState({
      postModal: !this.state.postModal
    });
  }

  openPostForm = () => {
    this.toggleModal();
  };

  handleSortChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.getSortedPosts(this.props.posts);
  }

  getSortedPosts = posts => {
    const filteredPosts =
      posts.length > 0 && "category" in this.props.match.params
        ? posts.filter(
            post => post.category === this.props.match.params.category
          )
        : posts;

    if (filteredPosts.length > 1) {
      const { sortBy, sortOrder } = this.state;
      filteredPosts.sort(compareValues(sortBy, sortOrder));
    }
    return filteredPosts;
  };

  render() {
    const { posts } = this.props;
    const displayPosts = this.getSortedPosts(posts);
    return (
      <div>
        <div>
          <Container>
            <Row>
              <Col>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="sortBy" className="mr-sm-2">
                      Sort By
                    </Label>
                    <Input
                      type="select"
                      name="sortBy"
                      id="sortBy"
                      defaultValue={this.state.sortBy}
                      onChange={this.handleSortChange}
                    >
                      <option value="voteScore">Votes</option>
                      <option value="title">Title</option>
                      <option value="timestamp">Timestamp</option>
                    </Input>
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="sortOrder" className="mr-sm-2">
                      Sort Order:
                    </Label>
                    <Input
                      type="select"
                      name="sortOrder"
                      id="sortOrder"
                      defaultValue={this.state.sortOrder}
                      onChange={this.handleSortChange}
                    >
                      <option value="desc">Desc</option>
                      <option value="asc">Asc</option>
                    </Input>
                  </FormGroup>
                </Form>
              </Col>
              <Col>
                <div className="float-right">
                  <Button color="link" onClick={this.openPostForm}>
                    <FaPlus /> Add Post
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {displayPosts.length ? (
          <ListGroup>
            {displayPosts.map(post => <PostInfo post={post} key={post.id} />)}
          </ListGroup>
        ) : (
          <Alert color="info">There are no articles in this category</Alert>
        )}

        <PostForm
          modalIsOpen={this.state.postModal}
          postId="0"
          onToggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: Object.values(state.posts)
  };
};

const mapDispatchToProps = dispatch => ({
  getAllPosts: data => dispatch(fetchAllPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
