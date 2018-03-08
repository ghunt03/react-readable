import * as ReadableAPI from "../utils/api";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS = "GET_POSTS";
export const UPDATE_VOTE = "UPDATE_VOTE";

export const fetchCategories = () => dispatch =>
  ReadableAPI.getCategories().then(data => dispatch(getCategories(data)));

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const fetchAllPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(data => dispatch(getAllPosts(data)));

export const getAllPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const postVote = ({ id, option, type }) => dispatch =>
  ReadableAPI.updateVote(id, option, type).then(data =>
    dispatch(updateVote(data))
  );

export const updateVote = (id, post) => ({
  type: UPDATE_VOTE,
  id,
  post
});
