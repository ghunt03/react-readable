import { GET_COMMENTS, ADD_COMMENT } from "../actions";

export default function comments(state = {}, action) {
  const { comments, comment } = action;
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
    default:
      return state;
  }
}
