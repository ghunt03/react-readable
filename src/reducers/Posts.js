import { GET_POSTS, UPDATE_VOTE, ADD_POST, EDIT_POST } from "../actions";

export default function posts(state = {}, action) {
  const { id, posts, post } = action;
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        ...posts.reduce((obj, item) => {
          obj[item.id] = item;
          return obj;
        }, {})
      };
    case ADD_POST:
      return {
        ...state,
        [post.id]: {
          ...post
        }
      };
    case EDIT_POST:
      return {
        ...state,
        [post.id]: {
          ...post
        }
      };
    case UPDATE_VOTE:
      return {
        ...state,
        [id]: {
          ...post
        }
      };
    default:
      return state;
  }
}
