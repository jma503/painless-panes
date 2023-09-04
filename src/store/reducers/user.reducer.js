// action types
const SET_USER = "SET_USER";

// action functions
export const setUser = (payload) => {
  return { type: SET_USER, payload };
};

// reducer
export function userReducer(state = {}, action) {
  if (action.type === SET_USER) {
    return action.payload;
  }

  return state;
}
