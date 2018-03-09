import * as ReadableAPI from "../utils/api";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS = "GET_POSTS";
export const UPDATE_VOTE = "UPDATE_VOTE";
export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
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
  ReadableAPI.updateVote(id, option, type).then(data =>
    dispatch(updateVote(id, data))
  );

export const updateVote = (id, post) => ({
  type: UPDATE_VOTE,
  id,
  post
});

// fetch comments for post
export const fetchComments = postId => dispatch =>
  ReadableAPI.getComments(postId).then(data => dispatch(getComments(data)));

export const getComments = comments => ({
  type: GET_COMMENTS,
  comments
});


//add comment to post
export const postComment = (data) => dispatch =>
  ReadableAPI.postComment(data).then(data => dispatch(addComment(data)));

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})
