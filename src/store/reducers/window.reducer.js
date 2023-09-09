// Commenting for now - don't believe we need a reducer for POSTing a frame,
// leaving it in in case we do need a window reducer down the road

// action types
export const UPDATE_WINDOWS = "UPDATE_WINDOWS";
export const SET_CURRENT_WINDOW = "SET_CURRENT_WINDOW";

// action functions
export const updateWindows = (payload) => {
  return { type: UPDATE_WINDOWS, payload };
};

// action to set the current window ID
export const setCurrentWindow = (payload) => {
  return { type: SET_CURRENT_WINDOW, payload };
};

// reducer
export function allWindowsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_WINDOWS:
      return [...state, action.payload];
    default:
      return state;
  }
}

export function currentWindowReducer(state = [], action) {
  switch (action.type) {
    // returns the current window's ID via state as an object
    case SET_CURRENT_WINDOW:
      return action.payload;
    default:
      return state;
  }
}
