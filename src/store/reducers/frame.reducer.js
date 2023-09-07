// action types
const SET_FRAMES = "SET_FRAMES";

// action functions
export const setFrames = (payload) => {
  return { type: SET_FRAMES, payload };
};

// reducer
export function framesReducer(state = {}, action) {
  if (action.type === SET_FRAMES) {
    return action.payload;
  }

  return state;
}
