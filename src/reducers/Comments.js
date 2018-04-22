import { UPDATE_COMMENT_VOTE } from "../actions/Voter";
import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT
} from "../actions/Comments";

export default function comments(state = {}, action) {
  const { id, comments, comment } = action;
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...comments.reduce((obj, item) => {
          obj[item.id] = item;
          return obj;
        }, {})
      };
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...comment
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...comment
        }
      };
    case UPDATE_COMMENT_VOTE:
      return {
        ...state,
        [id]: {
          ...comment
        }
      };
    case REMOVE_COMMENT:
      delete state[id]
      return {
        ...state
      };
    default:
      return state;
  }
}
