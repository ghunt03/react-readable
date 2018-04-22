import * as ReadableAPI from "../utils/api";

export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const GET_POSTS = "GET_POSTS";

// fetch all posts
export const fetchAllPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(data => dispatch(getAllPosts(data)));

export const getAllPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const postPost = data => dispatch =>
  ReadableAPI.postPost(data).then(data => dispatch(addPost(data)));

export const addPost = post => ({
  type: ADD_POST,
  post
});

export const updatePost = data => dispatch => {
  console.log("received",data);
  return ReadableAPI.updatePost(data).then(result => dispatch(editPost(result)));
}
  

export const editPost = post => ({
  type: EDIT_POST,
  post
});
