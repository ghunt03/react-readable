import * as ReadableAPI from "../utils/api";

export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";

// fetch all posts
export const fetchAllPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(data => dispatch(getAllPosts(data)));

export const getAllPosts = posts => ({
  type: GET_POSTS,
  posts
});

// create a new post
export const postPost = data => dispatch =>
  ReadableAPI.postPost(data).then(data => dispatch(addPost(data)));

export const addPost = post => ({
  type: ADD_POST,
  post
});

//Update a post
export const updatePost = data => dispatch =>
  ReadableAPI.updatePost(data).then(result => dispatch(editPost(result)));

export const editPost = post => ({
  type: EDIT_POST,
  post
});

//delete a post
export const deletePost = id => dispatch =>
  ReadableAPI.deletePost(id).then(data => dispatch(removePost(id)));

export const removePost = id => ({
  type: DELETE_POST,
  id
});
