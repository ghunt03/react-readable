import * as ReadableAPI from "../utils/api";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS = "GET_POSTS";
export const UPDATE_VOTE = "UPDATE_VOTE";
export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const UPDATE_COMMENT_VOTE = "UPDATE_COMMENT_VOTE";

// fetch categories
export const fetchCategories = () => dispatch =>
  ReadableAPI.getCategories().then(data => dispatch(getCategories(data)));

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

// fetch all posts
export const fetchAllPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(data => dispatch(getAllPosts(data)));

export const getAllPosts = posts => ({
  type: GET_POSTS,
  posts
});

// Update vote score
export const postVote = ({ id, option, type }) => dispatch =>
  ReadableAPI.updateVote(id, option, type).then(data => {
    switch (type) {
      case "comment":
        return dispatch(updateCommentVote(id, data));
      default:
        return dispatch(updatePostVote(id, data));
    }
  });

export const updatePostVote = (id, post) => ({
  type: UPDATE_VOTE,
  id,
  post
});

export const updateCommentVote = (id, comment) => ({
  type: UPDATE_COMMENT_VOTE,
  id,
  comment
});

// fetch comments for post
export const fetchComments = postId => dispatch =>
  ReadableAPI.getComments(postId).then(data => dispatch(getComments(data)));

export const getComments = comments => ({
  type: GET_COMMENTS,
  comments
});

//add comment to post
export const postComment = data => dispatch =>
  ReadableAPI.postComment(data).then(data => dispatch(addComment(data)));

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
});

export const updateComment = data => dispatch =>
  ReadableAPI.postComment(data).then(data => dispatch(editComment(data)));

export const editComment = comment => ({
  type: EDIT_COMMENT,
  comment
});

export const deleteComment = id => dispatch =>
  ReadableAPI.deleteComment(id).then(data => dispatch(removeComment(id)));

export const removeComment = id => ({
  type: REMOVE_COMMENT,
  id
});
