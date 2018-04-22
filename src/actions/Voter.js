import * as ReadableAPI from "../utils/api";

export const UPDATE_VOTE = "UPDATE_VOTE";
export const UPDATE_COMMENT_VOTE = "UPDATE_COMMENT_VOTE";

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
