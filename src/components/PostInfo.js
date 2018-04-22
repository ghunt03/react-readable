import React from "react";
import { Link } from "react-router-dom";
import {
  ListGroupItem,
  Container,
  Row,
  Col,
  Button,
  Input
} from "reactstrap";
import Voter from "./Voter";

const PostInfo = ({ post }) => (
  <ListGroupItem>
    <Container>
      <Row>
        <Col>
          <h4>
            <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
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
);

export default PostInfo;
