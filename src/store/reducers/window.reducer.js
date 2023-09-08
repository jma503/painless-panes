// Commenting for now - don't believe we need a reducer for POSTing a frame,
// leaving it in in case we do need a window reducer down the road

// action types
export const UPDATE_WINDOWS = "UPDATE_WINDOWS";

// action functions
export const updateWindows = (payload) => {
  return { type: UPDATE_WINDOWS, payload };
};

// reducer
export function windowReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_WINDOWS:
      return [...state, action.payload];
    default:
      return state;
  }
}
