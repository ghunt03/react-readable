import * as ReadableAPI from "../utils/api";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

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
  ReadableAPI.updateComment(data).then(data => dispatch(editComment(data)));

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