import { GET_POSTS, UPDATE_VOTE } from "../actions";


export default function posts(state = {}, action) {
  const { id, posts, post } = action;
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        ...posts.reduce((previous, current) => {
          previous[current.id] = current
          return previous
        }, {})
      };
    case UPDATE_VOTE:
      return {
        ...state,
        [id] : {
            ...post
        }
      };
    default:
      return state;
  }
}
